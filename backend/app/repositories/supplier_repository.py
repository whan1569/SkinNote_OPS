from sqlalchemy.orm import Session

from app.models.supplier import Supplier
from app.schemas.supplier import SupplierCreate, SupplierUpdate


class SupplierRepository:
    def get_list(self, db: Session) -> list[Supplier]:
        return (
            db.query(Supplier)
            .order_by(Supplier.created_at.desc())
            .all()
        )

    def get_by_code(
        self,
        db: Session,
        supplier_code: str,
    ) -> Supplier | None:
        return (
            db.query(Supplier)
            .filter(Supplier.supplier_code == supplier_code)
            .first()
        )

    def get_by_name(
        self,
        db: Session,
        supplier_name: str,
    ) -> Supplier | None:
        return (
            db.query(Supplier)
            .filter(Supplier.supplier_name == supplier_name)
            .first()
        )

    def create(
        self,
        db: Session,
        supplier_code: str,
        data: SupplierCreate,
    ) -> Supplier:
        supplier = Supplier(
            supplier_code=supplier_code,
            supplier_name=data.supplier_name,
            manager_name=data.manager_name,
            phone=data.phone,
            email=data.email,
            status=data.status,
        )

        db.add(supplier)
        db.commit()
        db.refresh(supplier)

        return supplier

    def update(
        self,
        db: Session,
        supplier: Supplier,
        data: SupplierUpdate,
    ) -> Supplier:
        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(supplier, key, value)

        db.commit()
        db.refresh(supplier)

        return supplier

    def delete(
        self,
        db: Session,
        supplier: Supplier,
    ) -> None:
        db.delete(supplier)
        db.commit()
