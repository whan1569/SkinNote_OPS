erDiagram

    PRODUCTS {
        varchar product_code PK "상품 코드"
        varchar product_name "상품명"
        varchar sku "SKU 코드"
        varchar category "카테고리"
        varchar brand "브랜드"
        timestamptz created_at "등록일"
        timestamptz updated_at "수정일"
    }

    SUPPLIERS {
        varchar supplier_code PK "공급처 코드"
        varchar supplier_name "공급처명"
        varchar manager_name "담당자명"
        varchar phone "연락처"
        varchar email "이메일"
        varchar status "공급처 상태"
        timestamptz created_at "등록일"
        timestamptz updated_at "수정일"
    }

    PLATFORMS {
        varchar platform_code PK "플랫폼 코드"
        varchar platform_name "플랫폼명"
        varchar type "플랫폼 타입"
        numeric commission_rate "수수료율"
        varchar status "플랫폼 상태"
        timestamptz created_at "등록일"
        timestamptz updated_at "수정일"
    }

    SUPPLIER_PRICES {
        varchar supplier_price_code PK "공급가 코드"
        varchar product_code FK "상품 코드"
        varchar supplier_code FK "공급처 코드"
        numeric purchase_price "매입 단가"
        int moq "최소 발주 수량"
        timestamptz created_at "등록일"
        timestamptz updated_at "수정일"
    }

    PLATFORM_PRICES {
        varchar platform_price_code PK "판매가 코드"
        varchar product_code FK "상품 코드"
        varchar platform_code FK "플랫폼 코드"
        numeric selling_price "판매가"
        numeric discount_rate "할인율"
        date start_date "적용 시작일"
        date end_date "적용 종료일"
        varchar sale_status "판매 상태"
        timestamptz created_at "등록일"
        timestamptz updated_at "수정일"
    }

    PRODUCTS ||--o{ PRODUCT_SUPPLIER_PRICES : "상품별 공급가"
    SUPPLIERS ||--o{ PRODUCT_SUPPLIER_PRICES : "공급처별 매입단가"

    PRODUCTS ||--o{ PRODUCT_PLATFORM_PRICES : "플랫폼별 판매가"
    PLATFORMS ||--o{ PRODUCT_PLATFORM_PRICES : "플랫폼 판매 정책"
