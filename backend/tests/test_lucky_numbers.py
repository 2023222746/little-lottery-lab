from app.schemas.lucky_number import LuckyNumberCreate


def test_valid_classic():
    payload = LuckyNumberCreate(
        product="4d_classic", numbers=["6087"], note="test"
    )
    assert payload.numbers == ["6087"]


def test_invalid_classic_length():
    import pytest
    from pydantic import ValidationError

    with pytest.raises(ValidationError):
        LuckyNumberCreate(product="4d_classic", numbers=["60"], note="")
        