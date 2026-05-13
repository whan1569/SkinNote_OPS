from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class PlatformPriceCreate(BaseModel):
    product_code: str
    platform_code: str
    selling_price: float
    discount_rate: float | None = 0
    start_date: date | None = None
    end_date: date | None = None
    sale_status: str = "판매중"


class PlatformPriceUpdate(BaseModel):
    selling_price: float | None = None
    discount_rate: float | None = None
    start_date: date | None = None
    end_date: date | None = None
    sale_status: str | None = None


class PlatformPriceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    platform_price_code: str
    product_code: str
    platform_code: str
    selling_price: float
    discount_rate: float | None
    start_date: date | None
    end_date: date | None
    sale_status: str
    created_at: datetime
    updated_at: datetime
