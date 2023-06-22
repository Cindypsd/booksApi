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

## API Endpoints

The API exposes the following endpoints:

#### Create a new book list

- Endpoint: POST /booklists
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

- Endpoint: GET /booklists
- Description: Retrieve all book lists.
- Response:

```bash
    [
        {    "id": 1,    "name": "My Book List 1", "books": []  },
        {    "id": 2,    "name": "My Book List 2", "books": []   },
    ]

```

#### Delete a book list

- Endpoint: DELETE /booklists
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

- Endpoint: GET /books?title=:title
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

- Endpoint: POST /booklists/:listId
- Description: Add a book to a list specified by the list ID.
- Request Body: bookId: The ID of the book to be added.
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

Note: Replace :name and :title in the endpoints with the actual name or title you want to use in the requests.

## Documentation

[Google Books API](https://developers.google.com/books/docs/v1/using)
