from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.supplier_price import (
    SupplierPriceCreate,
    SupplierPriceResponse,
    SupplierPriceUpdate,
)
from app.services.supplier_price_service import (
    SupplierPriceService,
)

router = APIRouter(
    prefix="/supplier-prices",
    tags=["Supplier Prices"],
)

service = SupplierPriceService()


@router.get(
    "",
    response_model=list[SupplierPriceResponse],
)
def get_supplier_prices(
    db: Session = Depends(get_db),
):
    return service.get_supplier_prices(db)


@router.get(
    "/{supplier_price_code}",
    response_model=SupplierPriceResponse,
)
def get_supplier_price(
    supplier_price_code: str,
    db: Session = Depends(get_db),
):
    return service.get_supplier_price(
        db,
        supplier_price_code,
    )


@router.post(
    "",
    response_model=SupplierPriceResponse,
)
def create_supplier_price(
    data: SupplierPriceCreate,
    db: Session = Depends(get_db),
):
    return service.create_supplier_price(
        db,
        data,
    )


@router.patch(
    "/{supplier_price_code}",
    response_model=SupplierPriceResponse,
)
def update_supplier_price(
    supplier_price_code: str,
    data: SupplierPriceUpdate,
    db: Session = Depends(get_db),
):
    return service.update_supplier_price(
        db,
        supplier_price_code,
        data,
    )


@router.delete("/{supplier_price_code}")
def delete_supplier_price(
    supplier_price_code: str,
    db: Session = Depends(get_db),
):
    return service.delete_supplier_price(
        db,
        supplier_price_code,
    )
