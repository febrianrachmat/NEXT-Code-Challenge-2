# Q&A Forum API

RESTful API for a Simple Q&A Forum. Users can register, log in, view profiles, and create discussion threads. A user may only update or delete threads they created.

This repository is the submission for **Code Challenge Milestone 2**.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Runtime | Node.js + TypeScript | Typed, maintainable backend code |
| Framework | NestJS | Modules, guards, and validation fit auth + CRUD cleanly |
| Database | PostgreSQL | Relational data with a clear one-to-many model |
| ORM | Prisma | Readable schema, migrations, and type-safe queries |
| Auth | JWT + bcrypt | Stateless login token; passwords stored as hashes |
| Docs | Swagger / OpenAPI | Interactive docs for every endpoint |

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ (local service running)
- npm

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/febrianrachmat/NEXT-Code-Challenge-2.git
cd NEXT-Code-Challenge-2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and adjust values if needed:

```bash
cp .env.example .env
```

| Variable | Purpose | Example |
|---|---|---|
| `PORT` | HTTP port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/qa_forum?schema=public` |
| `JWT_SECRET` | Secret used to sign access tokens | a long random string |
| `JWT_EXPIRES_IN` | Token lifetime | `1d` |

Never commit `.env`. Only `.env.example` is tracked.

### 4. Create the database

```sql
CREATE DATABASE qa_forum;
```

Or with `psql`:

```bash
psql -U postgres -c "CREATE DATABASE qa_forum;"
```

### 5. Run migrations

```bash
npx prisma migrate dev
```

This creates the `users` and `threads` tables and the foreign key from threads to users.

### 6. Seed dummy data

```bash
npm run prisma:seed
```

Seeded accounts (password for both: `secret`):

| ID | Username | Email |
|---|---|---|
| `U001` | johndoe | johndoe@example.com |
| `U002` | janedoe | jane@example.com |

Seeded threads: `T101` and `T103` belong to John, `T102` belongs to Jane.

### 7. Start the server

```bash
npm run start:dev
```

- API base URL: [http://localhost:3000/api](http://localhost:3000/api)
- Swagger UI: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Database design

One user can create many threads:

```
users 1 ──< threads
```

`users.id` is the primary key. `threads.user_id` is a foreign key with `ON DELETE CASCADE`, so deleting a user also removes their threads.

IDs follow the brief format: `U001`, `U002`, `T101`, `T102`, …

Passwords are stored in `password_hash` only. API responses never include that field.

## API endpoints

### Auth & users

| Method | Endpoint | Auth | Success |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | `201` |
| `POST` | `/api/auth/login` | No | `200` + JWT |
| `GET` | `/api/users/:id` | No | `200` |

### Threads

| Method | Endpoint | Auth | Success | Extra rule |
|---|---|---|---|---|
| `POST` | `/api/threads` | Yes | `201` | Owner is the logged-in user |
| `GET` | `/api/threads` | No | `200` | All users |
| `GET` | `/api/threads/my-threads` | Yes | `200` | Current user only |
| `GET` | `/api/threads/:id` | No | `200` | — |
| `PUT` | `/api/threads/:id` | Yes | `200` | Creator only |
| `DELETE` | `/api/threads/:id` | Yes | `200` | Creator only |

Protected routes expect:

```
Authorization: Bearer <access_token>
```

## Error handling

| Status | When |
|---|---|
| `400` | Empty fields, invalid email, extra unexpected fields |
| `401` | Missing/invalid JWT, or wrong login password |
| `403` | Logged-in user is not the thread creator |
| `404` | User or thread ID does not exist |
| `409` | Email or username already registered |
| `500` | Unexpected server error |

Error body shape:

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Authentication token is missing or invalid",
  "path": "/api/threads",
  "timestamp": "2026-04-22T08:15:00.000Z"
}
```

## Problem-solving approach

1. **Module boundaries** — `auth`, `users`, and `threads` are separate NestJS modules so each feature stays readable.
2. **Authorization at the service layer** — JWT proves *who* the caller is (`401`). Ownership proves *whether they may change this thread* (`403`). Those checks are distinct on purpose.
3. **Route order** — `GET /api/threads/my-threads` is declared before `GET /api/threads/:id` so `my-threads` is not parsed as an id.
4. **Prisma + env** — schema and credentials stay out of source code. Migrations keep the database reproducible.
5. **Swagger first for graders** — every endpoint documents the method, URL, body/headers, success payload, and error payloads so screenshots are straightforward.

## Project structure

```
src/
  auth/          register, login, JWT strategy, auth guard
  users/         public profile
  threads/       CRUD + ownership checks
  prisma/        Prisma client wrapper
  common/        filters, serializers, Swagger helpers
prisma/
  schema.prisma
  migrations/
  seed.ts
```

## Swagger screenshots

Open [http://localhost:3000/api/docs](http://localhost:3000/api/docs) and capture each endpoint as listed in [docs/screenshots/README.md](docs/screenshots/README.md).

For protected routes, click **Authorize**, paste the token from `POST /api/auth/login`, then use **Try it out**.

## License

UNLICENSED — coursework submission.
