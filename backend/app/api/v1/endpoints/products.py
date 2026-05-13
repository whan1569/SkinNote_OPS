from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.product import ProductCreate, ProductResponse, ProductUpdate
from app.services.product_service import ProductService

router = APIRouter(prefix="/products", tags=["Products"])

service = ProductService()


@router.get("", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return service.get_products(db)


@router.get("/{product_code}", response_model=ProductResponse)
def get_product(
    product_code: str,
    db: Session = Depends(get_db),
):
    return service.get_product(db, product_code)


@router.post("", response_model=ProductResponse)
def create_product(
    data: ProductCreate,
    db: Session = Depends(get_db),
):
    return service.create_product(db, data)


@router.patch("/{product_code}", response_model=ProductResponse)
def update_product(
    product_code: str,
    data: ProductUpdate,
    db: Session = Depends(get_db),
):
    return service.update_product(db, product_code, data)


@router.delete("/{product_code}")
def delete_product(
    product_code: str,
    db: Session = Depends(get_db),
):
    return service.delete_product(db, product_code)
