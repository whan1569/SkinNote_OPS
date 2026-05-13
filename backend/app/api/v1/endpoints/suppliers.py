from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.supplier import (
    SupplierCreate,
    SupplierResponse,
    SupplierUpdate,
)
from app.services.supplier_service import (
    SupplierService,
)

router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"],
)

service = SupplierService()


@router.get(
    "",
    response_model=list[SupplierResponse],
)
def get_suppliers(
    db: Session = Depends(get_db),
):
    return service.get_suppliers(db)


@router.get(
    "/{supplier_code}",
    response_model=SupplierResponse,
)
def get_supplier(
    supplier_code: str,
    db: Session = Depends(get_db),
):
    return service.get_supplier(
        db,
        supplier_code,
    )


@router.post(
    "",
    response_model=SupplierResponse,
)
def create_supplier(
    data: SupplierCreate,
    db: Session = Depends(get_db),
):
    return service.create_supplier(
        db,
        data,
    )


@router.patch(
    "/{supplier_code}",
    response_model=SupplierResponse,
)
def update_supplier(
    supplier_code: str,
    data: SupplierUpdate,
    db: Session = Depends(get_db),
):
    return service.update_supplier(
        db,
        supplier_code,
        data,
    )


@router.delete("/{supplier_code}")
def delete_supplier(
    supplier_code: str,
    db: Session = Depends(get_db),
):
    return service.delete_supplier(
        db,
        supplier_code,
    )
