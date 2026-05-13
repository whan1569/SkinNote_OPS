# SkinNote OPS Backend

## 프로젝트 개요

**SkinNote OPS Backend**는
`FastAPI + SQLAlchemy + SQLite` 기반으로 구축된 운영 관리 서버입니다.

현재 관리 대상:

* Products
* Suppliers
* Platforms
* Supplier Prices
* Platform Prices

---

# 기술 스택

| 항목         | 기술         |
| ---------- | ---------- |
| Framework  | FastAPI    |
| ORM        | SQLAlchemy |
| Database   | SQLite     |
| Validation | Pydantic   |
| API Docs   | Swagger    |
| Server     | Uvicorn    |

---

# 프로젝트 구조

```txt id="5fb2pf"
backend/
├─ app/
│
├─ main.py
│
├─ core/
│  └─ database.py
│
├─ models/
│  ├─ product.py
│  ├─ supplier.py
│  ├─ platform.py
│  ├─ supplier_price.py
│  └─ platform_price.py
│
├─ schemas/
│  ├─ product.py
│  ├─ supplier.py
│  ├─ platform.py
│  ├─ supplier_price.py
│  └─ platform_price.py
│
├─ repositories/
│  ├─ product_repository.py
│  ├─ supplier_repository.py
│  ├─ platform_repository.py
│  ├─ supplier_price_repository.py
│  └─ platform_price_repository.py
│
├─ services/
│  ├─ product_service.py
│  ├─ supplier_service.py
│  ├─ platform_service.py
│  ├─ supplier_price_service.py
│  └─ platform_price_service.py
│
├─ api/
│  └─ v1/
│     ├─ router.py
│     └─ endpoints/
│        ├─ products.py
│        ├─ suppliers.py
│        ├─ platforms.py
│        ├─ supplier_prices.py
│        └─ platform_prices.py
│
├─ seed/
│  ├─ products_seed.py
│  ├─ suppliers_seed.py
│  ├─ platforms_seed.py
│  ├─ supplier_prices_seed.py
│  ├─ platform_prices_seed.py
│  └─ run_seed.py
│
├─ utils/
│  └─ code_generator.py
│
├─ skinnote_ops.db
└─ requirements.txt
```

---

# 아키텍처 구조

```txt id="e5lwy8"
Client
  ↓
API Endpoint
  ↓
Service
  ↓
Repository
  ↓
Model
  ↓
Database
```

---

# 레이어별 역할

## 1. Models

DB 테이블 구조 정의.

```python id="32uwr4"
class Product(Base):
    __tablename__ = "products"
```

### 역할

* SQLAlchemy ORM 모델 정의
* 테이블 컬럼 정의
* 관계(Relationship) 정의

---

## 2. Schemas

Request / Response 데이터 구조 정의.

```python id="jz1vv8"
class ProductCreate(BaseModel):
```

### 역할

* 요청 데이터 검증
* 응답 데이터 직렬화
* Swagger 자동 문서화

---

## 3. Repositories

DB CRUD 전용 계층.

### 담당 기능

* SELECT
* INSERT
* UPDATE
* DELETE

### 특징

* 비즈니스 로직 없음
* 오직 DB 접근만 담당

---

## 4. Services

비즈니스 로직 처리 계층.

### 담당 기능

* 중복 검사
* 존재 여부 확인
* 코드 생성
* 예외 처리
* 데이터 가공

---

## 5. API Endpoints

실제 FastAPI 라우팅 정의.

```python id="rr6e0k"
@router.get("/products")
```

### 역할

* URL 연결
* Request → Service 전달
* Response 반환

---

# 코드 규칙

| 구분             | 코드 형식        |
| -------------- | ------------ |
| Product        | `PRD-000001` |
| Supplier       | `SUP-000001` |
| Platform       | `PLT-000001` |
| Supplier Price | `SPR-000001` |
| Platform Price | `PPR-000001` |

---

# 데이터베이스

현재 개발 환경:

```txt id="2wm8i6"
SQLite
```

DB 파일 위치:

```txt id="10kqu9"
backend/skinnote_ops.db
```

향후:

```txt id="qmtshv"
PostgreSQL 전환 예정
```

---

# 실행 방법

## 1. backend 폴더 이동

```powershell id="5knc2u"
cd backend
```

---

## 2. 가상환경 생성

최초 1회만 실행.

```powershell id="ig7mp5"
python -m venv .venv
```

---

## 3. 가상환경 활성화

### Windows

```powershell id="e7ul5n"
.venv\Scripts\activate
```

### 정상 활성화 확인

터미널 앞에:

```txt id="1w2udx"
(.venv)
```

표시되면 정상 활성화 상태.

---

## 4. 가상환경 비활성화

작업 종료 후:

```powershell id="tfgrpm"
deactivate
```

---

## 5. 패키지 설치

최초 1회만 실행.

```powershell id="knz6qz"
pip install fastapi uvicorn sqlalchemy pydantic
```

---

## 6. Seed 데이터 입력

초기 데이터 DB 삽입.

```powershell id="gb72vz"
python -m app.seed.run_seed
```

정상 실행 시:

```txt id="e7yeb9"
All seed completed.
```

출력됨.

---

## 7. FastAPI 서버 실행

```powershell id="3cn8q0"
uvicorn app.main:app --reload
```

정상 실행 시:

```txt id="gw6ldg"
Uvicorn running on http://127.0.0.1:8000
```

출력됨.

---

# Swagger API 문서

브라우저 접속:

```txt id="v7f4mn"
http://127.0.0.1:8000/docs
```

### 제공 기능

* API 테스트
* Request Body 입력
* Response 확인
* Schema 자동 문서화

---

# 서버 종료

터미널에서:

```txt id="ggq17j"
CTRL + C
```

---

# API 목록

## Products API

| Method | URL                               |
| ------ | --------------------------------- |
| GET    | `/api/v1/products`                |
| POST   | `/api/v1/products`                |
| GET    | `/api/v1/products/{product_code}` |
| PATCH  | `/api/v1/products/{product_code}` |
| DELETE | `/api/v1/products/{product_code}` |

---

## Suppliers API

| Method | URL                                 |
| ------ | ----------------------------------- |
| GET    | `/api/v1/suppliers`                 |
| POST   | `/api/v1/suppliers`                 |
| GET    | `/api/v1/suppliers/{supplier_code}` |
| PATCH  | `/api/v1/suppliers/{supplier_code}` |
| DELETE | `/api/v1/suppliers/{supplier_code}` |

---

## Platforms API

| Method | URL                                 |
| ------ | ----------------------------------- |
| GET    | `/api/v1/platforms`                 |
| POST   | `/api/v1/platforms`                 |
| GET    | `/api/v1/platforms/{platform_code}` |
| PATCH  | `/api/v1/platforms/{platform_code}` |
| DELETE | `/api/v1/platforms/{platform_code}` |

---

## Supplier Prices API

| Method | URL                                             |
| ------ | ----------------------------------------------- |
| GET    | `/api/v1/supplier-prices`                       |
| POST   | `/api/v1/supplier-prices`                       |
| GET    | `/api/v1/supplier-prices/{supplier_price_code}` |
| PATCH  | `/api/v1/supplier-prices/{supplier_price_code}` |
| DELETE | `/api/v1/supplier-prices/{supplier_price_code}` |

---

## Platform Prices API

| Method | URL                                             |
| ------ | ----------------------------------------------- |
| GET    | `/api/v1/platform-prices`                       |
| POST   | `/api/v1/platform-prices`                       |
| GET    | `/api/v1/platform-prices/{platform_price_code}` |
| PATCH  | `/api/v1/platform-prices/{platform_price_code}` |
| DELETE | `/api/v1/platform-prices/{platform_price_code}` |

---

# 주요 실행 명령어

## 서버 실행

```powershell id="8v7i8e"
uvicorn app.main:app --reload
```

---

## Seed 실행

```powershell id="ncm2m7"
python -m app.seed.run_seed
```

---

## 패키지 설치

```powershell id="u9w7m9"
pip install fastapi uvicorn sqlalchemy pydantic
```

---

## 가상환경 활성화

```powershell id="ot2m4f"
.venv\Scripts\activate
```

---

## 가상환경 비활성화

```powershell id="2zfj7m"
deactivate
```

---

# 개발 순서

```txt id="66t1o3"
1. backend 폴더 이동
2. 가상환경 활성화
3. 서버 실행
4. Swagger 확인
5. API 테스트
6. 프론트 연동
```

---

# 현재 완료 상태

## 완료된 기능

* SQLite 연결
* Swagger 연동
* CRUD API 구현
* Seed 데이터 구성
* Repository Layer 구현
* Service Layer 구현
* API Endpoint 구현

---

# 다음 작업 예정

## Backend

* PostgreSQL 전환
* 환경 변수 분리
* Alembic 마이그레이션 구성
* JWT 인증 추가

## Frontend 연동

* React Query 연결
* Mock 데이터 제거
* Axios 공통 Client 구성
* API 상태 관리 연결
