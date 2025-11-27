# Translation Tool

A web application for translating Nepali and Sinhala text to English using machine learning models.

## Project Structure

```
Translation tool/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── requirements.txt     # Python dependencies
│   └── model/              # Translation model files
│       ├── adapter_model.safetensors
│       ├── adapter_config.json
│       ├── tokenizer.json
│       └── ...
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx     # Main page
    │   │   ├── layout.tsx   # Root layout
    │   │   └── globals.css  # Global styles
    │   └── components/
    │       └── TranslationForm.tsx  # Translation interface
    ├── package.json
    └── ...
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The website will be available at `http://localhost:3000`

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Select source language (Nepali or Sinhala)
4. Enter text to translate
5. Click "Translate" to get English translation

## API Endpoints

- `GET /` - Health check
- `POST /translate` - Translate text
- `GET /supported-languages` - Get supported languages

## Features

- Support for Nepali to English translation
- Support for Sinhala to English translation
- Clean, responsive web interface
- Real-time translation
- Error handling and loading states