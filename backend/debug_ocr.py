from app.ocr_service import ocr_service
import os

print(f"API Key exists: {bool(ocr_service.api_key)}")
print(f"API Key: {ocr_service.api_key[:10] if ocr_service.api_key else 'None'}...")
print(f"Online status: {ocr_service._is_online()}")

if ocr_service.api_key and ocr_service._is_online():
    print("Should use Vision API")
else:
    print("Will use Tesseract fallback")