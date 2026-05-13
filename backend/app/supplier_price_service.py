from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.supplier_price_repository import (
    SupplierPriceRepository,
)
from app.schemas.supplier_price import (
    SupplierPriceCreate,
    SupplierPriceUpdate,
)
from app.utils.code_generator import (
    generate_supplier_price_code,
)


class SupplierPriceService:
    def __init__(self):
        self.repository = SupplierPriceRepository()

    def get_supplier_prices(self, db: Session):
        return self.repository.get_list(db)

    def get_supplier_price(
        self,
        db: Session,
        supplier_price_code: str,
    ):
        supplier_price = self.repository.get_by_code(
            db,
            supplier_price_code,
        )

        if not supplier_price:
            raise HTTPException(
                status_code=404,
                detail="공급가를 찾을 수 없습니다.",
            )

        return supplier_price

    def create_supplier_price(
        self,
        db: Session,
        data: SupplierPriceCreate,
    ):
        supplier_price_code = (
            generate_supplier_price_code(db)
        )

        return self.repository.create(
            db,
            supplier_price_code,
            data,
        )

    def update_supplier_price(
        self,
        db: Session,
        supplier_price_code: str,
        data: SupplierPriceUpdate,
    ):
        supplier_price = self.get_supplier_price(
            db,
            supplier_price_code,
        )

        return self.repository.update(
            db,
            supplier_price,
            data,
        )

    def delete_supplier_price(
        self,
        db: Session,
        supplier_price_code: str,
    ):
        supplier_price = self.get_supplier_price(
            db,
            supplier_price_code,
        )

        self.repository.delete(
            db,
            supplier_price,
        )

        return {"message": "공급가가 삭제되었습니다."}
