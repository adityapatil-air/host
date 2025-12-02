import requests
import os
import base64
from dotenv import load_dotenv

class PrintedTextOCR:
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv('GOOGLE_VISION_API_KEY')
    
    def extract_text(self, image_bytes):
        if not self.api_key:
            return "Google Vision API key not configured"
        
        try:
            url = f'https://vision.googleapis.com/v1/images:annotate?key={self.api_key}'
            encoded_image = base64.b64encode(image_bytes).decode('utf-8')
            
            payload = {
                'requests': [{
                    'image': {'content': encoded_image},
                    'features': [{'type': 'TEXT_DETECTION'}]
                }]
            }
            
            headers = {
                'Referer': 'http://localhost:3000',
                'Origin': 'http://localhost:3000'
            }
            response = requests.post(url, json=payload, headers=headers)
            
            if response.status_code != 200:
                return f"API Error {response.status_code}: {response.text}"
                
            result = response.json()
            
            if 'responses' in result and result['responses']:
                resp = result['responses'][0]
                if 'error' in resp:
                    return f"Vision API error: {resp['error']['message']}"
                
                annotations = resp.get('textAnnotations', [])
                if annotations:
                    return annotations[0]['description']
            
            return "No text found in image"
            
        except Exception as e:
            return f"OCR failed: {str(e)}"

class HandwrittenTextOCR:
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv('GOOGLE_VISION_API_KEY')
    
    def extract_text(self, image_bytes):
        if not self.api_key:
            return "Google Vision API key not configured"
        
        try:
            url = f'https://vision.googleapis.com/v1/images:annotate?key={self.api_key}'
            encoded_image = base64.b64encode(image_bytes).decode('utf-8')
            
            payload = {
                'requests': [{
                    'image': {'content': encoded_image},
                    'features': [{'type': 'DOCUMENT_TEXT_DETECTION'}]
                }]
            }
            
            headers = {
                'Referer': 'http://localhost:3000',
                'Origin': 'http://localhost:3000'
            }
            response = requests.post(url, json=payload, headers=headers)
            
            if response.status_code != 200:
                return f"API Error {response.status_code}: {response.text}"
                
            result = response.json()
            
            if 'responses' in result and result['responses']:
                resp = result['responses'][0]
                if 'error' in resp:
                    return f"Vision API error: {resp['error']['message']}"
                
                full_text = resp.get('fullTextAnnotation', {})
                if full_text and 'text' in full_text:
                    return full_text['text']
                
                annotations = resp.get('textAnnotations', [])
                if annotations:
                    return annotations[0]['description']
            
            return "No text found in image"
            
        except Exception as e:
            return f"Handwriting OCR failed: {str(e)}"

printed_ocr = PrintedTextOCR()
handwritten_ocr = HandwrittenTextOCR()
