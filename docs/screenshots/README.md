# Swagger screenshot checklist

Open http://localhost:3000/api/docs after running `npm run start:dev`.

Each screenshot should clearly show:

1. HTTP method and URL
2. Request body, headers, or path parameters
3. Success response example (200 / 201)
4. Error response examples (400 / 401 / 403 / 404 as applicable)

Save files in this folder using the names below.

## Auth

| File | Endpoint | What to capture |
|---|---|---|
| `01-register.png` | `POST /api/auth/register` | Body (`username`, `email`, `password`), 201 and 400/409 |
| `02-login.png` | `POST /api/auth/login` | Body (`email`, `password`), 200 with token and 401 |

## Users

| File | Endpoint | What to capture |
|---|---|---|
| `03-get-user.png` | `GET /api/users/{id}` | Path param `id`, 200 and 404 |

## Threads

| File | Endpoint | What to capture |
|---|---|---|
| `04-create-thread.png` | `POST /api/threads` | Bearer token, body, 201 and 401 |
| `05-list-threads.png` | `GET /api/threads` | 200 list (no auth) |
| `06-my-threads.png` | `GET /api/threads/my-threads` | Bearer token, 200 and 401 |
| `07-get-thread.png` | `GET /api/threads/{id}` | Path param `id`, 200 and 404 |
| `08-update-thread.png` | `PUT /api/threads/{id}` | Bearer token, body, 200, 403, 404 |
| `09-delete-thread.png` | `DELETE /api/threads/{id}` | Bearer token, 200, 403, 404 |

## How to authorize in Swagger

1. Call `POST /api/auth/login` with `johndoe@example.com` / `secret`
2. Copy `access_token`
3. Click **Authorize** at the top of Swagger UI
4. Paste the token (without the word `Bearer`)
5. Try protected endpoints
