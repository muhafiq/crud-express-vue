# Post API Documentation

## Get all post

- Method: GET
- Endpoint: `/api/v1/post/all`
- Headers:
  - Content-Type: application/json
  - Cookie: refreshToken `required`
  - Authorization: accessToken `required`
- Request Body `not required`

- Response Body

```json
{
  "code": 200,
  "message": "All posts",
  "data": [
    {
      "postId": "7c06b136-f49b-4e6a-bcd8-af48b108f6b3",
      "title": "Test Post",
      "content": "This is a test post",
      "author": {
        "userId": "a93e8bf0-5452-4730-a883-62b990e45573",
        "username": "user name"
      }
    }
  ]
}
```

## Get all user post

- Method: GET
- Endpoint: `/api/v1/post/:userId`
- Headers:
  - Content-Type: application/json
  - Cookie: refreshToken `required`
  - Authorization: accessToken `required`
- Request params: `required userId`
- Request Body `not required`

- Response Body

```json
{
  "code": 200,
  "message": "User posts",
  "data": [
    {
      "postId": "7c06b136-f49b-4e6a-bcd8-af48b108f6b3",
      "title": "Test Post",
      "content": "This is a test post"
    }
  ]
}
```

## Search post

- Method: GET
- Endpoint: `/api/v1/post/search?q=keyword`
- Headers:
  - Content-Type: application/json
  - Cookie: refreshToken `required`
  - Authorization: accessToken `required`
- Request params: `required query params`
- Request Body `not required`

- Response Body

```json
{
  "code": 200,
  "message": "Search posts",
  "data": [
    {
      "postId": "7c06b136-f49b-4e6a-bcd8-af48b108f6b3",
      "title": "Test Post",
      "content": "This is a test post",
      "author": {
        "userId": "a93e8bf0-5452-4730-a883-62b990e45573",
        "username": "user name"
      }
    }
  ]
}
```

## Create post

- Method: POST
- Endpoint: `/api/v1/post/create`
- Headers:
  - Content-Type: application/json
  - Cookie: refreshToken `required`
  - Authorization: accessToken `required`
- Request Body

```json
{
  "title": "Test Post",
  "content": "This is a test post"
}
```

- Response Body

```json
{
  "code": 201,
  "message": "Post created",
  "data": {
    "postId": "7c06b136-f49b-4e6a-bcd8-af48b108f6b3",
    "title": "Test Post",
    "content": "This is a test post",
    "authorId": "a93e8bf0-5452-4730-a883-62b990e45573",
    "createdAt": "2024-05-07T14:04:55.474Z",
    "updatedAt": "2024-05-07T14:04:55.474Z"
  }
}
```

## Update/Edit post

- Method: POST
- Endpoint: `/api/v1/post/edit/:postId`
- Headers:
  - Content-Type: application/json
  - Cookie: refreshToken `required`
  - Authorization: accessToken `required`
- Request Body

```json
{
  "title": "Test Post update",
  "content": "This is a test post update"
}
```

- Response Body

```json
{
  "code": 200,
  "message": "Post updated",
  "data": {
    "postId": "7c06b136-f49b-4e6a-bcd8-af48b108f6b3",
    "title": "Test Post update",
    "content": "This is a test post update",
    "authorId": "a93e8bf0-5452-4730-a883-62b990e45573",
    "createdAt": "2024-05-07T14:04:55.474Z",
    "updatedAt": "2024-05-07T14:21:18.304Z"
  }
}
```

## Delete post

- Method: POST
- Endpoint: `/api/v1/post/delete/:postId`
- Headers:
  - Content-Type: application/json
  - Cookie: refreshToken `required`
  - Authorization: accessToken `required`
- Request Body `not required`

- Response Body

```json
{
  "code": 200,
  "message": "Post deleted",
  "data": []
}
```
