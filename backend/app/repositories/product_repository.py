from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


class ProductRepository:
    def get_list(self, db: Session) -> list[Product]:
        return db.query(Product).order_by(Product.created_at.desc()).all()

    def get_by_code(self, db: Session, product_code: str) -> Product | None:
        return (
            db.query(Product)
            .filter(Product.product_code == product_code)
            .first()
        )

    def get_by_sku(self, db: Session, sku: str) -> Product | None:
        return db.query(Product).filter(Product.sku == sku).first()

    def create(
        self,
        db: Session,
        product_code: str,
        data: ProductCreate,
    ) -> Product:
        product = Product(
            product_code=product_code,
            product_name=data.product_name,
            sku=data.sku,
            category=data.category,
            brand=data.brand,
        )

        db.add(product)
        db.commit()
        db.refresh(product)

        return product

    def update(
        self,
        db: Session,
        product: Product,
        data: ProductUpdate,
    ) -> Product:
        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(product, key, value)

        db.commit()
        db.refresh(product)

        return product

    def delete(self, db: Session, product: Product) -> None:
        db.delete(product)
        db.commit()
