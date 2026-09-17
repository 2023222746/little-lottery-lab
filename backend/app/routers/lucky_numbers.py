from typing import List, Optional

from fastapi import APIRouter, HTTPException, Query, status

from app.schemas.lucky_number import (
    LuckyNumberCreate,
    LuckyNumberResponse,
    LuckyNumberUpdate,
)
from app.services import lucky_number_service

router = APIRouter(prefix="/api/lucky-numbers", tags=["lucky-numbers"])


@router.post("", response_model=LuckyNumberResponse, status_code=status.HTTP_201_CREATED)
def create_lucky_number(payload: LuckyNumberCreate):
    return lucky_number_service.create_lucky_number(payload)


@router.get("", response_model=List[LuckyNumberResponse])
def list_lucky_numbers(product: Optional[str] = Query(default=None)):
    return lucky_number_service.list_lucky_numbers(product)


@router.get("/{lucky_id}", response_model=LuckyNumberResponse)
def get_lucky_number(lucky_id: str):
    doc = lucky_number_service.get_lucky_number(lucky_id)
    if doc is None:
        raise HTTPException(status_code=404, detail="Lucky Number not found")
    return doc


@router.put("/{lucky_id}", response_model=LuckyNumberResponse)
def update_lucky_number(lucky_id: str, payload: LuckyNumberUpdate):
    doc = lucky_number_service.update_lucky_number(lucky_id, payload)
    if doc is None:
        raise HTTPException(status_code=404, detail="Lucky Number not found")
    return doc


@router.delete("/{lucky_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lucky_number(lucky_id: str):
    if not lucky_number_service.delete_lucky_number(lucky_id):
        raise HTTPException(status_code=404, detail="Lucky Number not found")
    return None
