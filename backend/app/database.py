from pymongo import MongoClient
from pymongo.errors import ConfigurationError, ConnectionFailure

from app.config import settings


def get_client() -> MongoClient:
    try:
        return MongoClient(settings.mongo_uri, serverSelectionTimeoutMS=5000)
    except ConfigurationError as e:
        raise RuntimeError(f"Invalid MongoDB URI: {e}") from e


def get_database():
    client = get_client()
    return client[settings.mongo_db_name]


def ping_database() -> bool:
    try:
        client = get_client()
        client.admin.command("ping")
        return True
    except ConnectionFailure:
        return False

    