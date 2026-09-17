from datetime import datetime, timezone
from typing import List, Optional

from app.models.lucky_number import get_collection
from app.schemas.lucky_number import LuckyNumberCreate


def _to_dict(doc: dict) -> dict:
    """Convert a Mongo document into a JSON-friendly dict."""
    doc["id"] = str(doc.pop("_id"))
    return doc


def create_lucky_number(payload: LuckyNumberCreate) -> dict:
    now = datetime.now(timezone.utc)
    doc = {
        "product": payload.product.value,
        "numbers": payload.numbers,
        "note": payload.note,
        "created_at": now,
        "updated_at": now,
    }
    result = get_collection().insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc


def list_lucky_numbers(product: Optional[str] = None) -> List[dict]:
    query = {}
    if product:
        query["product"] = product

    cursor = get_collection().find(query).sort("created_at", -1)
    return [_to_dict(d) for d in cursor]
from datetime import datetime, timezone
from typing import List, Optional

from app.models.lucky_number import get_collection
from app.schemas.lucky_number import LuckyNumberCreate


def _to_dict(doc: dict) -> dict:
    """Convert a Mongo document into a JSON-friendly dict."""
    doc["id"] = str(doc.pop("_id"))
    return doc


def create_lucky_number(payload: LuckyNumberCreate) -> dict:
    now = datetime.now(timezone.utc)
    doc = {
        "product": payload.product.value,
        "numbers": payload.numbers,
        "note": payload.note,
        "created_at": now,
        "updated_at": now,
    }
    result = get_collection().insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc


def list_lucky_numbers(product: Optional[str] = None) -> List[dict]:
    query = {}
    if product:
        query["product"] = product

    cursor = get_collection().find(query).sort("created_at", -1)
    return [_to_dict(d) for d in cursor]

