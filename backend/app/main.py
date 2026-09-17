from fastapi import FastAPI

app = FastAPI(
    title="Little Lottery Data Laboratory API",
    description="Backend API for the Magnum Lucky Number Booklet.",
    version="0.1.0",
)


@app.get("/")
def read_root():
    return {"message": "Little Lottery Data Laboratory API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}