from fastapi import APIRouter

from app.api.v1.endpoints import (
    platform_prices,
    platforms,
    products,
    supplier_prices,
    suppliers,
)

api_router = APIRouter()

api_router.include_router(products.router)
api_router.include_router(suppliers.router)
api_router.include_router(platforms.router)
api_router.include_router(supplier_prices.router)
api_router.include_router(platform_prices.router)
