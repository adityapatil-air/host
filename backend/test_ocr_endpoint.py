import requests
from PIL import Image, ImageDraw, ImageFont
import io

# Create test image
img = Image.new('RGB', (300, 100), color='white')
draw = ImageDraw.Draw(img)
try:
    font = ImageFont.truetype("arial.ttf", 30)
except:
    font = ImageFont.load_default()
draw.text((10, 30), "Test Text", fill='black', font=font)

img_bytes = io.BytesIO()
img.save(img_bytes, format='PNG')
img_bytes.seek(0)

# Test printed endpoint
files = {'file': ('test.png', img_bytes, 'image/png')}
response = requests.post('http://localhost:8001/ocr/printed', files=files)
print(f"Printed OCR Status: {response.status_code}")
print(f"Response: {response.json()}")

# Test handwritten endpoint
img_bytes.seek(0)
files = {'file': ('test.png', img_bytes, 'image/png')}
response = requests.post('http://localhost:8001/ocr/handwritten', files=files)
print(f"\nHandwritten OCR Status: {response.status_code}")
print(f"Response: {response.json()}")
