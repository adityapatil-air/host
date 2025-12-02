from app.ocr_service import ocr_service
from PIL import Image, ImageDraw, ImageFont
import io

# Create a test image with text
def create_test_image():
    img = Image.new('RGB', (300, 100), color='white')
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("arial.ttf", 20)
    except:
        font = ImageFont.load_default()
    
    draw.text((10, 30), "Hello World", fill='black', font=font)
    
    # Convert to bytes
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')
    return img_bytes.getvalue()

def test_ocr():
    print("Creating test image...")
    image_bytes = create_test_image()
    
    print("Testing OCR service...")
    result = ocr_service.extract_text(image_bytes)
    
    print(f"OCR Result: '{result}'")
    
    if result and "Hello" in result:
        print("[SUCCESS] OCR is working!")
    else:
        print("[WARNING] OCR may not be working properly")

if __name__ == "__main__":
    test_ocr()