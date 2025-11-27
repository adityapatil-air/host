from pymongo import MongoClient
import os
from datetime import datetime

MONGODB_URL = "mongodb+srv://agrawalmayuri554_db_user:KyD9SjAeF0PP69Ae@cluster1.lnqlhyn.mongodb.net/translation_app?retryWrites=true&w=majority"

client = MongoClient(MONGODB_URL)
db = client.translation_db
translations_collection = db.translations

def save_translation(source_text, translated_text, source_lang, target_lang):
    """Save translation to database"""
    translation_doc = {
        "source_text": source_text,
        "translated_text": translated_text,
        "source_lang": source_lang,
        "target_lang": target_lang,
        "timestamp": datetime.utcnow()
    }
    return translations_collection.insert_one(translation_doc)

def get_translation_history(limit=50):
    """Get recent translations"""
    return list(translations_collection.find().sort("timestamp", -1).limit(limit))