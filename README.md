# Pokédex App

## Overview
The Pokédex App is a web application that allows users to browse Pokémon, view various information about them, and save their favorite Pokémon. This application includes user authentication, an API for managing data, and utilizes an external API to fetch Pokémon information.

## Features
- **User Authentication:**
  - Registration and login pages for users with unique usernames and encrypted passwords.
  - Passwords are securely stored using modern encryption methods (bcrypt).

- **Pokémon Browsing:**
  - A homepage displaying a list of Pokémon with pagination.
  - Sort Pokémon by name or by number.
  - Search functionality to find Pokémon by name.

- **User Features:**
  - Authenticated users can search for other users and view their favorite Pokémon.
  - A personal user page displaying the authenticated user’s favorite Pokémon and settings to change their username and password.
  - Users can like and unlike Pokémon.

- **Information Pages:**
  - Detailed information page for each Pokémon, accessible to all users.
  - User profile pages that show the favorite Pokémon of the user (only for authenticated users).

- **Header, Main, and Footer:**
  - A consistent layout with a header, main content area, and footer across all pages.

## Technologies Used
- **Frontend:** React (with React Bootstrap for styling). Redux is utilized for state management, enabling efficient handling of application state across components.
- **Backend:** Node.js and Express
- **Database:** PostgreSQL
- **External API:** Pokémon API (for fetching Pokémon data)
- **Authentication:** JSON Web Tokens (JWT) for secure authentication
- **Security:** Measures to prevent SQL injection and cross-site scripting (XSS)

## Prerequisites
- `Docker`
  
## Compilation
1. Clone the repository:
```
git clone git@github.com:k2matu/Pokedex.git
```
2. Navigate into the project folder
```
cd Pokedex
```
3. Build and start the application using Docker
```
docker-compose up --build
```
4. Access the application
- Open your browser and go to:
```
http://localhost:5173/
```
5. Stop the application
```
docker-compose down
```

