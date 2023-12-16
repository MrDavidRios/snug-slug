# SnugSlug API Documentation

## Base URL

`http://127.0.0.1:8080/api/snugslug`

## Search Listing

**GET** `/searchListing`

- Search for listings based on various criteria.

### Parameters

- `location` (string): The desired location.
- `minPrice` (integer): The minimum price.
- `maxPrice` (integer): The maximum price.
- `startDate` (date): The start date for the listing (format: YYYY-MM-DD).
- `endDate` (date): The end date for the listing (format: YYYY-MM-DD).

### Example Request

```
GET http://127.0.0.1:8080/api/snugslug/searchListing?location=Upper%20West&minPrice=1000&maxPrice=2000&startDate=2024-07-01&endDate=2024-08-01
```

## Create Listing

**POST** `/createListing`

- Create a new listing with detailed information.

### Request Body

- `location` (string): Location of the apartment.
- `overview` (string): Brief description of the apartment.
- `details` (array of strings): Array containing features of the apartment.
- `tags` (array of strings): Array of tags related to the apartment.
- `requirements` (array of strings): Requirements for renting the apartment.
- `additionalInfo` (array of strings): Any additional information.
- `startDate` (date): Start date of availability (format: YYYY-MM-DD).
- `endDate` (date): End date of availability (format: YYYY-MM-DD).
- `rent` (integer): Monthly rent in dollars.
- `apartmentImgUrls` (array of strings): URLs to images of the apartment.

### Example Request

```
POST http://127.0.0.1:8080/api/snugslug/createListing
Content-Type: application/json
```

```json
{
  "location": "Chinatown, Manhattan",
  "overview": "1 Bedroom apartment near Central Park",
  "details": ["Doorman", "Gym access"],
  "tags": ["Doorman", "Gym access"],
  "requirements": ["Credit check", "No smoking"],
  "additionalInfo": ["Park access"],
  "startDate": "2024-04-09",
  "endDate": "2024-07-14",
  "rent": 3000,
  "apartmentImgUrls": ["images/apartment.png"]
}
```

## Get Listing

**GET** `/getListing/{listingId}`

- Retrieve details of a specific listing by its ID.

### Path Parameters

- `listingId` (integer): The unique identifier of the listing.

### Example Request

```
GET http://127.0.0.1:8080/api/snugslug/getListing/31
```

## Update Listing

**PUT** `/updateListing/{listingId}`

- Update specific details of an existing listing.

### Path Parameters

- `listingId` (integer): The unique identifier of the listing to be updated.

### Request Body

- A JSON object containing the fields to be updated.

### Example Request

```
PUT http://127.0.0.1:8080/api/snugslug/updateListing/31
Content-Type: application/json
```

```json
{
  "rent": 2000
}
```

## Delete Listing

**DELETE** `/deleteListing/{listingId}`

- Delete a specific listing by its ID.

### Path Parameters

- `listingId` (integer): The unique identifier of the listing to be deleted.

### Example Request

```
DELETE http://127.0.0.1:8080/api/snugslug/deleteListing/31
```

## Create User

**POST** /createUser

- Create a new user with profile information.

### Request Body

- `name` (string): Name of the user.
- `email` (string): Email address of the user.
- `age` (integer): Age of the user.
- `school` (string): School or university the user attends.
- `classYear` (integer): Graduation year of the user.
- `pronouns` (string): Pronouns of the user.
- `profilePicUrl` (string): URL to the user's profile picture.
- `bio`(string): Short biography of the user.
- `budget` (string): Budget range of the user.
- `startDate` (date): The start date of interest (format: YYYY-MM-DD).
- `endDate` (date): The end date of interest (format: YYYY-MM-DD).
- `activeListingId` (integer): Posted listing of the user, 0 if user looking for listing.

### Example Request

```
POST http://127.0.0.1:8080/api/snugslug/createUser
Content-Type: application/json
```

```json
{
  "name": "Emily Smith",
  "email": "emily1@columbia.edu",
  "age": 22,
  "school": "Columbia University",
  "classYear": 2024,
  "pronouns": "She/Her",
  "profilePicUrl": "images/profile.png",
  "bio": "Senior at Columbia, majoring in Political Science. Looking for a summer sublet. I'm organized, respectful of shared spaces, and love to bake.",
  "budget": "1300",
  "startDate": "2024-06-01",
  "endDate": "2024-08-30",
  "activeListingId": 0
}
```

## Get User

**GET** /getUser/{userId}

- Retrieve details of a specific user by their ID.

### Path Parameters

- `userId` (integer): The unique identifier of the user.

### Example Request

```
GET http://127.0.0.1:8080/api/snugslug/getUser/1
```
