from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.supplier_repository import (
    SupplierRepository,
)
from app.schemas.supplier import (
    SupplierCreate,
    SupplierUpdate,
)
from app.utils.code_generator import (
    generate_supplier_code,
)


class SupplierService:
    def __init__(self):
        self.repository = SupplierRepository()

    def get_suppliers(self, db: Session):
        return self.repository.get_list(db)

    def get_supplier(
        self,
        db: Session,
        supplier_code: str,
    ):
        supplier = self.repository.get_by_code(
            db,
            supplier_code,
        )

        if not supplier:
            raise HTTPException(
                status_code=404,
                detail="공급처를 찾을 수 없습니다.",
            )

        return supplier

    def create_supplier(
        self,
        db: Session,
        data: SupplierCreate,
    ):
        exists = self.repository.get_by_name(
            db,
            data.supplier_name,
        )

        if exists:
            raise HTTPException(
                status_code=400,
                detail="이미 존재하는 공급처입니다.",
            )

        supplier_code = generate_supplier_code(db)

        return self.repository.create(
            db,
            supplier_code,
            data,
        )

    def update_supplier(
        self,
        db: Session,
        supplier_code: str,
        data: SupplierUpdate,
    ):
        supplier = self.get_supplier(
            db,
            supplier_code,
        )

        return self.repository.update(
            db,
            supplier,
            data,
        )

    def delete_supplier(
        self,
        db: Session,
        supplier_code: str,
    ):
        supplier = self.get_supplier(
            db,
            supplier_code,
        )

        self.repository.delete(db, supplier)

        return {"message": "공급처가 삭제되었습니다."}
