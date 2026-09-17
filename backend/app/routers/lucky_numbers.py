from typing import List, Optional

from fastapi import APIRouter, Query

from app.schemas.lucky_number import LuckyNumberCreate, LuckyNumberResponse
from app.services import lucky_number_service

router = APIRouter(prefix="/api/lucky-numbers", tags=["lucky-numbers"])


@router.post("", response_model=LuckyNumberResponse, status_code=201)
def create_lucky_number(payload: LuckyNumberCreate):
    return lucky_number_service.create_lucky_number(payload)


@router.get("", response_model=List[LuckyNumberResponse])
def list_lucky_numbers(product: Optional[str] = Query(default=None)):
    return lucky_number_service.list_lucky_numbers(product)
