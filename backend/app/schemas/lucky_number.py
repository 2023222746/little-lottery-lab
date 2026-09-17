from datetime import datetime
from enum import Enum
from typing import List

from pydantic import BaseModel, Field, model_validator


class ProductType(str, Enum):
    CLASSIC = "4d_classic"
    JACKPOT = "4d_jackpot"
    MGOLD = "mgold"
    JACKPOT_GOLD = "4d_jackpot_gold"
    MAGNUM_LIFE = "magnum_life"


# Expected digit length for each number, per product
PRODUCT_RULES = {
    ProductType.CLASSIC: [4],
    ProductType.JACKPOT: [4, 4],
    ProductType.MGOLD: [6],
    ProductType.JACKPOT_GOLD: [6, 2],
    ProductType.MAGNUM_LIFE: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
}


class LuckyNumberBase(BaseModel):
    product: ProductType
    numbers: List[str] = Field(..., min_length=1)
    note: str = Field(default="", max_length=500)

    @model_validator(mode="after")
    def validate_format(self):
        rules = PRODUCT_RULES[self.product]

        if len(self.numbers) != len(rules):
            raise ValueError(
                f"{self.product.value} requires {len(rules)} number(s), "
                f"got {len(self.numbers)}"
            )

        for i, (num, expected_len) in enumerate(zip(self.numbers, rules), start=1):
            if not num.isdigit():
                raise ValueError(f"Number {i} must contain only digits")
            if len(num) != expected_len:
                raise ValueError(
                    f"Number {i} must be {expected_len} digits, got {len(num)}"
                )

        if self.product == ProductType.MAGNUM_LIFE:
            for i, num in enumerate(self.numbers, start=1):
                value = int(num)
                if not 1 <= value <= 36:
                    raise ValueError(
                        f"Magnum Life number {i} must be between 01 and 36"
                    )

        return self


class LuckyNumberCreate(LuckyNumberBase):
    pass


class LuckyNumberResponse(LuckyNumberBase):
    id: str
    created_at: datetime
    updated_at: datetime

class LuckyNumberUpdate(LuckyNumberBase):
    pass

