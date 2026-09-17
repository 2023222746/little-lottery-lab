# Architecture

## Overview

Little Lottery Data Laboratory is a three-tier application:

1. **Frontend** — ReactJS single-page application
2. **Backend** — FastAPI REST API
3. **Database** — MongoDB Atlas

## Diagram

```
┌─────────────────────────────┐
│         Browser             │
│  React SPA (port 5173)      │
│                             │
│  - Home                     │
│  - 5 Product Pages          │
│  - LuckyNumberForm          │
│  - SavedNumberCard          │
└──────────────┬──────────────┘
               │  HTTP / JSON (Axios)
               ▼
┌─────────────────────────────┐
│      FastAPI (port 8000)    │
│                             │
│  Routers   → /api/lucky-numbers
│  Schemas   → Pydantic models
│  Services  → business logic
│  Models    → MongoDB helpers
└──────────────┬──────────────┘
               │  pymongo
               ▼
┌─────────────────────────────┐
│     MongoDB Atlas (cloud)   │
│                             │
│  DB:   little_lottery_lab   │
│  Coll: lucky_numbers        │
└─────────────────────────────┘
```

## Data Flow — Creating a Lucky Number

1. User fills the form in React and clicks **Save**
2. `luckyNumberService.create(payload)` calls `POST /api/lucky-numbers`
3. FastAPI validates the payload with Pydantic
4. The service inserts a document into MongoDB
5. The response returns to React, which refreshes the list

## Data Model

```json
{
  "_id": "ObjectId",
  "product": "4d_classic",
  "numbers": ["6087"],
  "note": "My favourite number.",
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```

## Validation Rules

| Product | Numbers required | Digits per number |
|---|---|---|
| 4D Classic | 1 | 4 |
| 4D Jackpot | 2 | 4, 4 |
| mGold | 1 | 6 |
| 4D Jackpot Gold | 2 | 6, 2 |
| Magnum Life | 10 | 2 each (01–36) |

Validation runs in **both** the React form and the FastAPI backend, so the
API is safe even if someone calls it directly.
