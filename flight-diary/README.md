# Flight Diary App

This project is a full-stack application built with **Express.js** for the backend and **React** with **TypeScript** for the frontend. It allows users to log and view flight diary entries, including details such as date, weather, visibility, and comments. The project is part of the Full Stack Open course (Part 9).

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Backend](#backend)
- [Frontend](#frontend)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Features
- **Backend**:
  - REST API for managing flight diary entries.
  - Endpoints for fetching all entries, fetching a single entry by ID, and adding a new entry.
  - Input validation and error handling.
- **Frontend**:
  - Displays a list of all flight diary entries.
  - Form for adding new entries with fields for date, weather, visibility, and comments.
  - Notifications for successful or failed operations.
  - Responsive and modular component design.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/josemigueli/fso-part9.git
   cd fso-part9/flight-diary
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Start the backend server:
   ```bash
   cd ../backend
   npm run dev
   ```

4. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

5. Open the app in your browser at `http://localhost:3000`.

## Usage

### Backend
The backend server runs on port `3000` and provides the following endpoints:
- **GET /ping**: A test endpoint that returns "pong".
- **GET /api/diaries**: Fetches all flight diary entries.
- **GET /api/diaries/:id**: Fetches a single diary entry by ID.
- **POST /api/diaries**: Adds a new diary entry. The request body should include:
  ```json
  {
    "date": "2023-10-10",
    "weather": "sunny",
    "visibility": "great",
    "comment": "Perfect day for flying!"
  }
  ```

### Frontend
The frontend provides the following features:
- **Header**: Displays the title of the app.
- **Add New Entry**: A form to add a new flight diary entry with fields for date, weather, visibility, and comment.
- **All Entries**: Displays a list of all diary entries with details such as date, weather, visibility, and comment.
- **Notifications**: Displays success or error messages for user actions.

## Scripts

### Backend
- `npm run dev`: Starts the backend server in development mode.
- `npm run lint`: Runs ESLint to check for code style issues.
- `npm start`: Starts the backend server in production mode.

### Frontend
- `npm start`: Starts the frontend development server.
- `npm run build`: Builds the frontend for production.
- `npm run lint`: Runs ESLint to check for code style issues.

## Dependencies

### Backend
- **Runtime**: `express`, `cors`
- **Development**: `@types/express`, `@types/cors`, `ts-node-dev`, `typescript`, `eslint`

### Frontend
- **Runtime**: `react`, `react-dom`, `axios`
- **Development**: `@types/react`, `@types/react-dom`, `typescript`, `eslint`

## License
This project is licensed under the ISC License.