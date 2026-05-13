from sqlalchemy.orm import Session

from app.models.supplier_price import SupplierPrice
from app.schemas.supplier_price import (
    SupplierPriceCreate,
    SupplierPriceUpdate,
)


class SupplierPriceRepository:
    def get_list(self, db: Session) -> list[SupplierPrice]:
        return (
            db.query(SupplierPrice)
            .order_by(SupplierPrice.created_at.desc())
            .all()
        )

    def get_by_code(
        self,
        db: Session,
        supplier_price_code: str,
    ) -> SupplierPrice | None:
        return (
            db.query(SupplierPrice)
            .filter(
                SupplierPrice.supplier_price_code
                == supplier_price_code
            )
            .first()
        )

    def create(
        self,
        db: Session,
        supplier_price_code: str,
        data: SupplierPriceCreate,
    ) -> SupplierPrice:
        supplier_price = SupplierPrice(
            supplier_price_code=supplier_price_code,
            product_code=data.product_code,
            supplier_code=data.supplier_code,
            purchase_price=data.purchase_price,
            moq=data.moq,
        )

        db.add(supplier_price)
        db.commit()
        db.refresh(supplier_price)

        return supplier_price

    def update(
        self,
        db: Session,
        supplier_price: SupplierPrice,
        data: SupplierPriceUpdate,
    ) -> SupplierPrice:
        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(supplier_price, key, value)

        db.commit()
        db.refresh(supplier_price)

        return supplier_price

    def delete(
        self,
        db: Session,
        supplier_price: SupplierPrice,
    ) -> None:
        db.delete(supplier_price)
        db.commit()
