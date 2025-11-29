from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
from database import save_translation, get_translation_history

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Translation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
model = None
tokenizer = None
model_status = "loading"

def load_model():
    global model, tokenizer, model_status
    try:
        logger.info("Loading merged translation model...")
        
        from transformers import MBartForConditionalGeneration, MBart50Tokenizer
        import torch
        import os
        
        model_path = "../merged_model"
        
        if not os.path.exists(model_path):
            logger.warning("Local model not found, using fallback translation")
            model_status = "fallback"
            return
        
        logger.info("Loading tokenizer...")
        tokenizer = MBart50Tokenizer.from_pretrained(model_path)
        
        logger.info("Loading model...")
        model = MBartForConditionalGeneration.from_pretrained(model_path)
        model.eval()
        
        model_status = "ready"
        logger.info("Model loaded successfully!")
        
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        model_status = "fallback"
        model = None
        tokenizer = None

# Load model on startup
load_model()

class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

class TranslationResponse(BaseModel):
    translated_text: str
    source_lang: str
    target_lang: str

@app.get("/")
async def root():
    return {
        "message": "Translation API", 
        "model_status": model_status,
        "model_loaded": model is not None
    }

@app.post("/translate", response_model=TranslationResponse)
async def translate_text(request: TranslationRequest):
    if model_status == "fallback":
        # Fallback translation for demo purposes
        input_text = request.text.strip()
        if not input_text:
            raise HTTPException(status_code=400, detail="Empty text")
        
        translated_text = f"[Demo Translation] {input_text}"
        
        try:
            save_translation(input_text, translated_text, request.source_lang, request.target_lang)
        except Exception as db_error:
            logger.warning(f"Failed to save to database: {db_error}")
        
        return TranslationResponse(
            translated_text=translated_text,
            source_lang=request.source_lang,
            target_lang=request.target_lang
        )
    
    if model is None or tokenizer is None:
        raise HTTPException(
            status_code=503, 
            detail=f"Model not available. Status: {model_status}"
        )
    
    try:
        input_text = request.text.strip()
        if not input_text:
            raise HTTPException(status_code=400, detail="Empty text")
        
        # Set language codes
        if request.source_lang == "nepali":
            src_lang = "ne_NP"
        elif request.source_lang == "sinhala":
            src_lang = "si_LK"
        else:
            raise HTTPException(status_code=400, detail="Unsupported source language")
        
        tgt_lang = "en_XX"
        
        # Set source language
        tokenizer.src_lang = src_lang
        
        # Tokenize
        encoded = tokenizer(input_text, return_tensors="pt")
        
        # Generate translation
        import torch
        with torch.no_grad():
            generated_tokens = model.generate(
                **encoded,
                forced_bos_token_id=tokenizer.lang_code_to_id[tgt_lang],
                max_length=512,
                num_beams=4,
                early_stopping=True
            )
        
        # Decode
        translated_text = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
        
        # Save to database
        try:
            save_translation(input_text, translated_text, request.source_lang, request.target_lang)
        except Exception as db_error:
            logger.warning(f"Failed to save to database: {db_error}")
        
        return TranslationResponse(
            translated_text=translated_text,
            source_lang=request.source_lang,
            target_lang=request.target_lang
        )
        
    except Exception as e:
        logger.error(f"Translation error: {e}")
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

@app.get("/supported-languages")
async def get_supported_languages():
    return {
        "languages": [
            {"code": "nepali", "name": "Nepali"},
            {"code": "sinhala", "name": "Sinhala"},
            {"code": "english", "name": "English"}
        ]
    }

@app.get("/history")
async def get_history():
    try:
        history = get_translation_history()
        return {"translations": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting Translation API server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)