from bson import ObjectId
from bson.errors import InvalidId
from fastapi import HTTPException

from app.schemas.lucky_number import LuckyNumberCreate, LuckyNumberUpdate

from datetime import datetime, timezone
from typing import List, Optional

from app.models.lucky_number import get_collection
from app.schemas.lucky_number import LuckyNumberCreate


def _to_dict(doc: dict) -> dict:
    """Convert a Mongo document into a JSON-friendly dict."""
    doc["id"] = str(doc.pop("_id"))
    return doc


def _parse_id(lucky_id: str) -> ObjectId:
    try:
        return ObjectId(lucky_id)
    except (InvalidId, TypeError):
        return None


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


def get_lucky_number(lucky_id: str) -> Optional[dict]:
    oid = _parse_id(lucky_id)
    if oid is None:
        return None

    doc = get_collection().find_one({"_id": oid})
    return _to_dict(doc) if doc else None


def update_lucky_number(lucky_id: str, payload: LuckyNumberUpdate) -> Optional[dict]:
    oid = _parse_id(lucky_id)
    if oid is None:
        return None

    now = datetime.now(timezone.utc)
    update = {
        "$set": {
            "product": payload.product.value,
            "numbers": payload.numbers,
            "note": payload.note,
            "updated_at": now,
        }
    }

    result = get_collection().update_one({"_id": oid}, update)
    if result.matched_count == 0:
        return None

    doc = get_collection().find_one({"_id": oid})
    return _to_dict(doc)


def delete_lucky_number(lucky_id: str) -> bool:
    oid = _parse_id(lucky_id)
    if oid is None:
        return False

    result = get_collection().delete_one({"_id": oid})
    return result.deleted_count == 1

