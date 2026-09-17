from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import ping_database
from app.routers import lucky_numbers

app = FastAPI(
    title="Little Lottery Data Laboratory API",
    description="Backend API for the Magnum Lucky Number Booklet.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lucky_numbers.router)


@app.get("/")
def read_root():
    return {"message": "Little Lottery Data Laboratory API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/db-health")
def db_health():
    connected = ping_database()
    return {"mongo": "connected" if connected else "not connected"}
