from fastapi import FastAPI

from app.database import ping_database
from app.routers import lucky_numbers

app = FastAPI(
    title="Little Lottery Data Laboratory API",
    description="Backend API for the Magnum Lucky Number Booklet.",
    version="0.1.0",
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
