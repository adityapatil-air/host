from database import save_translation, get_translation_history

# Test database connection
try:
    # Create a test translation
    result = save_translation("नमस्ते", "Hello", "nepali", "english")
    print(f"Test translation saved with ID: {result.inserted_id}")
    
    # Fetch history
    history = get_translation_history()
    print(f"Found {len(history)} translations in database")
    
except Exception as e:
    print(f"Database error: {e}")