# Auth API Documentation

## Login

- Method: POST
- Endpoint: `/api/v1/auth/login`
- Headers:
  - Content-Type: application/json
- Request Body

```json
{
  "email": "user@mail.com",
  "password": "password"
}
```

- Response Body

```json
{
  "code": 200,
  "message": "User logged in",
  "accessToken": "your access token",
  "data": {
    "userId": "userid",
    "username": "username",
    "name": "name",
    "email": "user@mail.com"
  }
}
```

## Register

- Method: POST
- Endpoint: `/api/v1/auth/register`
- Headers:
  - Content-Type: application/json
- Request Body

```json
{
  "name": "name",
  "email": "user@mail.com",
  "username": "username",
  "password": "password",
  "confPassword": "password"
}
```

- Response Body

```json
{
  "code": 201,
  "message": "User created",
  "data": {
    "userId": "userid",
    "username": "username",
    "name": "name",
    "email": "user@mail.com"
  }
}
```

## Logout

- Method: DELETE
- Endpoint: `/api/v1/auth/logout`
- Headers:
  - Content-Type: application/json
- Request Body `not required`

- Response Body

```json
{
  "code": 200,
  "message": "User logged out"
}
```

## Refresh Access Token

- Method: GET
- Endpoint: `/api/v1/auth/token`
- Headers:
  - Content-Type: application/json
  - Cookie : refreshToken `required`
- Request Body `not required`

- Response Body

```json
{
  "code": 200,
  "message": "Token refreshed",
  "accessToken": "your token"
}
```

## Error Response

```json
{
  "code": 404, // depends on your error code
  "message": "not found", // depends on your error message
  "error": true
}
```
