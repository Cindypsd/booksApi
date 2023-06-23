# Book List API

This Book List API allows users to manage and organize their book lists. It provides endpoints to create, update, and delete book lists, as well it integrates with the Google Books API to search for books and add them to the lists.

## Installation

To run the Book List API locally, follow these steps:

1. Clone the repository:

```bash
  git clone https://github.com/Cindypsd/booksApi.git
```

2. Install the dependencies:

```bash
  cd <project_directory>
  npm install
```

3. Configure the environment variables:
   Create a .env file in the root directory and specify the following environment variables:

```bash
  DB_USER=<database_username>
  DB_PASSWORD=<database_password>
  DB_HOST=<database_host>
```

4. Set up the database:

Make sure you have a PostgreSQL database set up. Update the database configuration in the db.js file with your database credentials.

5. Start the server:

```bash
  npm start
```

## **USAGE**

####  User Registration

- Endpoint: `/user/sign-up`
- Method: `POST`
- Description: Creates a new user account.
- Request body:
```bash
    {
        "email" : "test@prueba.com",
	    "password" : "1235545672"
    }
```
- Response:
```bash
    {
        "id": 12,
        "email" : "test@prueba.com",
	    "password" : "1235545672"
    }
```

#### User Login

- Endpoint: `/user/login`
- Method: `POST`
- Description: Authenticates a user and generates an access token.
- Request body:
```bash
    {
        "email" : "test@prueba.com",
	    "password" : "1235545672"
    }
```
- Response: Returns an access token.


**Note**: The access token should be included in the header of subsequent requests as follows:

```bash
    Authorization: Bearer <token>
```
Where <token> is the access token generated during the login process.


## **BookList API**


#### Create a new book list

- Endpoint: `/booklists`
- Method: `POST`
- Description: Create a new book list.
- Request body:

```bash
    {
        "name": "My Book List"
    }
```

- Response :

```bash
    {
        "id": 1,
        "name": "My Book List"
    }
```

#### Get all book lists

- Endpoint: `/booklists`
- Method: `GET`
- Description: Retrieve all book lists.
- Response:

```bash
    [
        {    "id": 1,    "name": "My Book List 1", "books": []  },
        {    "id": 2,    "name": "My Book List 2", "books": []   },
    ]

```

#### Search a book lists by name

- Endpoint: `/booklists?name=name`
- Method: `GET`
- Description: Retrieve a book lists.
- Request example:  `/booklists?name=favo`
- Response exmple:

```bash
    [
        {
            "id": 2,
            "name": "Mis favoritos 2",
            "books": [
                {
                    "id": "2InwDwAAQBAJ",
                    "title": "El gran libro de la cocina",
                    "description": "Muchas personas s...",
                    "authors": [
                        "Laura Landra",
                        "Margherita Landra",
                        "Pietro Semino"
                    ],
                    "categories": [
                        "Cooking / Methods / General",
                        "Cooking / Methods / Low Budget",
                        "Cooking / Courses & Dishes / General",
                        "Cooking / General"
                    ]
                }
            ]
        },
        {
            "id": 4,
            "name": "Mis favoritos 4",
            "books": []
        },
        {
            "id": 5,
            "name": "Mis favoritos 5",
            "books": []
        },
    ]

```

#### Delete a book list

- Endpoint: `/booklists`
- Method: `DELETE`
- Description: Delete a book list by its ID. Specify the ID in the request body.
- Request body:

```bash
    {
        "id": 1
    }
```

- Response :

```bash
    {
        "message": "Book list deleted successfully"
    }
```

#### Search for books by title

- Endpoint: `/books/search?title=:title`
- Method: `GET`
- Description: Search for books by their title using the Google Books API and query.
- Response:

```bash
    [
        {
		    "title": "Primer amor",
		    "id": "XoC0DwAAQBAJ",
		    "description": "Primer amor (1860) es uno de los mejores ejemplos de r...",
		    "authors": ["Ivan Turguenev"],
            "categories": [ "Fiction"]
	    },
    ]
```

#### Add book to a List

- Endpoint: `/booklists/:listId/add-book`
- Method: `POST`
- Description: Add a book to a list specified by the list ID.
- Request Body: bookId:

```bash
    [
        {
		    "bookId": "XoC0DwAAQBAJ",
	    },
    ]
```
- Response:
```bash
    [
        {
		   "title": "Primer amor",
		    "id": "XoC0DwAAQBAJ",
		    "description": "Primer amor (1860) es uno de ...",
		    "authors": ["Ivan Turguenev"],
            "categories": [ "Fiction"]
	    },
    ]
```

#### Remove book from List

- Endpoint: `/booklists/:listId/remove-book/:bookId`
- Method: `DELETE`
- Description: Remove a book from a list specified by the list ID.
- Response:
```bash
   'Book < book title > removed from the list'
```

Note: Replace :name and :title in the endpoints with the actual name or title you want to use in the requests.

## Documentation

[Google Books API](https://developers.google.com/books/docs/v1/using)
