import requests
import base64
import os
from dotenv import load_dotenv

load_dotenv()

def test_vision_api():
    api_key = os.getenv('GOOGLE_VISION_API_KEY')
    
    if not api_key:
        print("[ERROR] No API key found in .env file")
        return False
    
    print(f"[OK] API key found: {api_key[:10]}...")
    
    # Test with a simple base64 encoded test image (1x1 pixel)
    test_image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
    
    url = f'https://vision.googleapis.com/v1/images:annotate?key={api_key}'
    
    payload = {
        'requests': [{
            'image': {'content': test_image},
            'features': [{'type': 'TEXT_DETECTION'}]
        }]
    }
    
    try:
        print("[TESTING] Vision API...")
        headers = {'Referer': 'http://localhost:3000'}
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("[SUCCESS] Vision API is working!")
            print(f"Response: {result}")
            return True
        else:
            print(f"[ERROR] API Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"[ERROR] Connection Error: {e}")
        return False

if __name__ == "__main__":
    test_vision_api()