import requests
import base64
from PIL import Image, ImageDraw, ImageFont
import io

# Create test image
img = Image.new('RGB', (300, 100), color='white')
draw = ImageDraw.Draw(img)
try:
    font = ImageFont.truetype("arial.ttf", 30)
except:
    font = ImageFont.load_default()
draw.text((10, 30), "Hello World", fill='black', font=font)

img_bytes = io.BytesIO()
img.save(img_bytes, format='PNG')
image_bytes = img_bytes.getvalue()

# Test API with referrer
api_key = "AIzaSyAbgeVCWl9KcuZotZagLWibRXpGa26nucw"
url = f'https://vision.googleapis.com/v1/images:annotate?key={api_key}'

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
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
