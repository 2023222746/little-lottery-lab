from app.database import get_database

COLLECTION_NAME = "lucky_numbers"


def get_collection():
    """Return the MongoDB collection for Lucky Numbers."""
    return get_database()[COLLECTION_NAME]