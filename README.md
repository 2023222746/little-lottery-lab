# Little Lottery Data Laboratory — Magnum Lucky Number Booklet

A small full-stack web application for saving personal favourite or inspired
numbers across five Magnum game formats. Built as a Python Bootcamp project.

## Features

- Five Magnum product chapters:
  - Magnum 4D Classic
  - Magnum 4D Jackpot
  - mGold
  - Magnum 4D Jackpot Gold
  - Magnum Life
- Product-specific number input and validation
- Personal note for each saved number
- Full CRUD: Add, View, Edit, Delete
- Data persisted in MongoDB Atlas
- Clean, reusable React components

> ⚠️ This project is a personal number booklet. It is **not** a lottery
> prediction tool and does not analyse historical results.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | ReactJS (Vite) |
| Backend | FastAPI (Python) |
| Database | MongoDB Atlas |
| HTTP Client | Axios |

## Architecture

```
React Frontend  →  FastAPI Backend  →  MongoDB Atlas
   (port 5173)         (port 8000)         (cloud)
```

More detail in [`docs/architecture.md`](docs/architecture.md).

## Project Structure

```
little-lottery-lab/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── routers/
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── config/
    └── package.json
```

## Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- A MongoDB Atlas account

### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1          # Windows PowerShell
pip install -r requirements.txt
```

Create `backend/.env`:

```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
MONGO_DB_NAME=little_lottery_lab
```

Run the API:

```bash
uvicorn app.main:app --reload
```

API docs: http://127.0.0.1:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173

## API Endpoints

| Method | Path | Purpose |
|---|---|---|
| POST   | `/api/lucky-numbers`         | Create a Lucky Number |
| GET    | `/api/lucky-numbers`         | List Lucky Numbers (optional `?product=`) |
| GET    | `/api/lucky-numbers/{id}`    | Get one |
| PUT    | `/api/lucky-numbers/{id}`    | Update |
| DELETE | `/api/lucky-numbers/{id}`    | Delete |
| GET    | `/health`                    | Health check |
| GET    | `/db-health`                 | MongoDB connection check |

## License

For educational use only.

