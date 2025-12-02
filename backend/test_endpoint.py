import requests
from PIL import Image, ImageDraw, ImageFont
import io

# Create test image
img = Image.new('RGB', (200, 50), color='white')
draw = ImageDraw.Draw(img)
draw.text((10, 15), "Test Text", fill='black')

# Convert to bytes
img_bytes = io.BytesIO()
img.save(img_bytes, format='PNG')
img_bytes.seek(0)

# Test OCR endpoint
try:
    files = {'file': ('test.png', img_bytes, 'image/png')}
    response = requests.post('http://localhost:8000/ocr', files=files)
    
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
except Exception as e:
    print(f"Error: {e}")