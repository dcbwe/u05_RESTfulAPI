## Purpose

The goal is to build a **RESTful API** that represents parts of a **registration and profile management process**, designed to be integrated with a future application.

<details>
<summary>users interaction</summary>

- Register an account with name and email
- Receive a personalized welcome message upon registration
- Update their profile with individual various information
- Delete their account if necessary
- Get clear feedback in case of incorrect input or incomplete data

</details>

## Design

### Object Modeling

<details>
<summary>resources</summary>

 - users
 - profiles
 - details
 - health
 - settings

</details>

### Resource URI's

<details>
<summary>endpoints</summary>
  
```plaintext
/users
/users/{userId}
  
/users/{userId}/profile

/users/{userId}/details
/users/{userId}/settings
/users/{userId}/health
```
</details>

### Resource Representations


<details>
<summary>users collection</summary>

```json
{
  "size": 2,
  "links": [
    {
      "rel": "self",
      "href": "/users"
    }
  ],
  "users": [
    {
      "id": "123456789",
      "email": "alice@example.com",
      "active": true,
      "verified": true,
      "createdAt": "2025-01-01T00:01Z",
      "updatedAt": "2025-01-01T00:01Z",
      "links": [
        {
          "rel": "self",
          "href": "/users/123456789"
        }
      ]
    },
    {
      "id": "102030405",
      "email": "alyze@example.com",
      "active": true,
      "verified": true,
      "createdAt": "2025-02-02T00:02Z",
      "updatedAt": "2025-01-01T00:01Z",
      "links": [
        { 
          "rel": "self", 
          "href": "/users/102030405"
        }
      ]
    }
  ]
}
```

</details>

<details>
<summary>single profiles</summary>

```json
{
  "profiles": {
    "id": "998877",
    "userId": "123456789",
    "firstname": "Alice",
    "lastname": "Ali",
    "age": 29,
    "sex": "female",
    "city": "Oslo",
    "country": "Norway",
    "createdAt": "2025-01-01T00:01:00Z",
    "updatedAt": "2025-01-12T08:34:00Z",
    "links": [
      {
        "rel": "self",
        "href": "/profile/998877"
      }
    ]
  }
}
```

</details>

<details>
<summary>single details</summary>

```json
{
  "details": {
    "id": "776655",
    "userId": "123456789",
    "height": 165,
    "weight": 60,
    "dailyRoutine": "Standing and Moving",
    "training": "2–4 days/week",
    "createdAt": "2025-01-01T00:01:00Z",
    "updatedAt": "2025-01-12T08:34:00Z",
    "links": [
      {
        "rel": "self",
        "href": "/users/123456789/details"
      }
    ]
  }
}
```

</details>

<details>
<summary>single settings</summary>

```json
{
  "settings": {
    "id": "443322",
    "userId": "123456789",
    "language": "en",
    "units": "normal",
    "darkMode": true,
    "notifications": {
      "email": true,
      "sms": false
    },
    "createdAt": "2025-01-01T00:01:00Z",
    "updatedAt": "2025-01-12T08:34:00Z",
    "links": [
      {
        "rel": "self",
        "href": "/users/123456789/settings"
      }
    ]
  }
}
```

</details>

<details>
<summary>read-only health</summary>

```json
{
  "health": {
    "age": 29,
    "height": 165,
    "weight": 60,
    "bmr": 1380.25,
    "activityFactor": 1.55,
    "calories": 2139.4
  },
  "links": [
    {
      "rel": "self",
      "href": "/users/123456789/health"
    }
  ]
}
```

</details>

### HTTP Method Assignment

<details>
<summary>endpoints and methods</summary>

```plaintext
/users                     POST 
/users/{userId}            GET, DELETE

/users/{userId}/profile    POST, GET, PUT, DELETE

/users/{userId}/details    POST, GET, PUT, DELETE

/users/{userId}/settings   POST, GET, PUT, DELETE

/users/{userId}/health     GET 
```
</details>
