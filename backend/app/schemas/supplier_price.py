from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SupplierPriceCreate(BaseModel):
    product_code: str
    supplier_code: str
    purchase_price: float
    moq: int


class SupplierPriceUpdate(BaseModel):
    purchase_price: float | None = None
    moq: int | None = None


class SupplierPriceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    supplier_price_code: str
    product_code: str
    supplier_code: str
    purchase_price: float
    moq: int
    created_at: datetime
    updated_at: datetime
