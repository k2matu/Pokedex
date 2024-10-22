# Pokédex App

## Overview
The Pokédex App is a web application that allows users to browse Pokémon, view various information about them, and save their favorite Pokémon. This application includes user authentication, an API for managing data, and utilizes an external API to fetch Pokémon information.

## Features
- **User Authentication:**
  - Registration and login pages for users with unique usernames and encrypted passwords.
  - Passwords are securely stored using modern encryption methods (not MD5).

- **Pokémon Browsing:**
  - A homepage displaying a list of Pokémon with pagination or infinite scroll.
  - Sort Pokémon by name or by the number of likes, and group them by type.
  - Search functionality to find Pokémon by name.

- **User Features:**
  - Authenticated users can search for other users and view their favorite Pokémon.
  - A personal user page displaying the authenticated user’s favorite Pokémon and settings to change their username and password.
  - Users can like and unlike Pokémon, and optionally dislike and un-dislike them.

- **Information Pages:**
  - Detailed information page for each Pokémon, accessible to all users.
  - User profile pages that show the favorite Pokémon of the user (only for authenticated users).

- **Header, Main, and Footer:**
  - A consistent layout with a header, main content area, and footer across all pages.

## Technologies Used
- **Frontend:** React (with React Bootstrap for styling)
- **Backend:** Node.js and Express
- **Database:** PostgreSQL
- **External API:** Pokémon API (for fetching Pokémon data)
- **Authentication:** JSON Web Tokens (JWT) for secure authentication
- **Security:** Measures to prevent SQL injection and cross-site scripting (XSS)

## Environment Variables

Before running the project, create a `.env` file in the root directory based on the example below. This file should contain the necessary environment variables for the application to function correctly.




## Compilation
1. Clone the repository:
```
git@github.com:k2matu/Pokedex.git
````
2. Navigate into the directory:
```
cd Pokedex
```
3. Create a `.env` file in the root directory based on the example below:

```plaintext
# PostgreSQL Configuration
PG_HOST=postgres          # Hostname for the PostgreSQL database
PG_PORT=5432             # Port for the PostgreSQL database
PG_USER=postgres         # Username for the PostgreSQL database
PG_PASSWORD=mysecretpassword  # Password for the PostgreSQL database
PG_DATABASE=pokedex_db   # Name of the PostgreSQL database

# Application Configuration
PORT=3001                # Port for the Node.js server
SECRET=mysecrettoken     # Secret token for session management or authentication
BCRYPT_SALTROUNDS=10     # Number of salt rounds for password hashing

4. Build and Start the Application:
```
docker-compose up --build
```
