from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.product_repository import ProductRepository
from app.schemas.product import ProductCreate, ProductUpdate
from app.utils.code_generator import generate_product_code


class ProductService:
    def __init__(self):
        self.repository = ProductRepository()

    def get_products(self, db: Session):
        return self.repository.get_list(db)

    def get_product(self, db: Session, product_code: str):
        product = self.repository.get_by_code(db, product_code)

        if not product:
            raise HTTPException(
                status_code=404,
                detail="상품을 찾을 수 없습니다.",
            )

        return product

    def create_product(self, db: Session, data: ProductCreate):
        exists = self.repository.get_by_sku(db, data.sku)

        if exists:
            raise HTTPException(
                status_code=400,
                detail="이미 존재하는 SKU입니다.",
            )

        product_code = generate_product_code(db)

        return self.repository.create(db, product_code, data)

    def update_product(
        self,
        db: Session,
        product_code: str,
        data: ProductUpdate,
    ):
        product = self.get_product(db, product_code)

        if data.sku:
            sku_owner = self.repository.get_by_sku(db, data.sku)

            if sku_owner and sku_owner.product_code != product_code:
                raise HTTPException(
                    status_code=400,
                    detail="이미 존재하는 SKU입니다.",
                )

        return self.repository.update(db, product, data)

    def delete_product(self, db: Session, product_code: str):
        product = self.get_product(db, product_code)
        self.repository.delete(db, product)

        return {"message": "상품이 삭제되었습니다."}
