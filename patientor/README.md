# Patientor App

This project is a full-stack application built with **Express.js** for the backend and **React** with **TypeScript** for the frontend. It serves as a patient management system where healthcare professionals can view patient information, add new patients, and log medical entries. The project is part of the Full Stack Open course (Part 9).

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
  - REST API for managing patient and diagnosis data.
  - Endpoints for fetching patients, diagnoses, and adding new patients or entries.
  - Input validation and error handling using **Zod**.
- **Frontend**:
  - Displays a list of patients with details such as name, gender, occupation, and health rating.
  - Allows adding new patients with a form.
  - Enables viewing detailed patient information, including medical entries.
  - Supports adding new medical entries (e.g., Health Check, Hospital, Occupational Healthcare).
  - Responsive and modular component design using **Material-UI**.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/josemigueli/fso-part9.git
   cd fso-part9/patientor
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
The backend server runs on port `3001` and provides the following endpoints:
- **GET /api/ping**: A test endpoint that returns "pong".
- **GET /api/diagnoses**: Fetches all diagnoses.
- **GET /api/patients**: Fetches all patients (without sensitive information like SSN).
- **GET /api/patients/:id**: Fetches a single patient by ID.
- **POST /api/patients**: Adds a new patient. The request body should include:
  ```json
  {
    "name": "John Doe",
    "ssn": "123-45-6789",
    "dateOfBirth": "1990-01-01",
    "occupation": "Engineer",
    "gender": "male"
  }
  ```
- **POST /api/patients/:id/entries**: Adds a new medical entry for a patient. The request body should include:
  ```json
  {
    "type": "HealthCheck",
    "description": "Annual checkup",
    "date": "2023-10-10",
    "specialist": "Dr. Smith",
    "healthCheckRating": 0
  }
  ```

### Frontend
The frontend provides the following features:
- **Patient List**: Displays a list of all patients with their name, gender, occupation, and health rating.
- **Add New Patient**: A form to add a new patient with fields for name, SSN, date of birth, occupation, and gender.
- **Patient Details**: Displays detailed information about a patient, including their medical entries.
- **Add New Entry**: A form to add a new medical entry for a patient, with fields specific to the type of entry (e.g., Health Check, Hospital, Occupational Healthcare).

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
- **Runtime**: `express`, `cors`, `uuid`, `zod`
- **Development**: `@types/express`, `@types/cors`, `ts-node-dev`, `typescript`, `eslint`

### Frontend
- **Runtime**: `react`, `react-dom`, `axios`, `react-router-dom`, `@mui/material`
- **Development**: `@types/react`, `@types/react-dom`, `typescript`, `eslint`

## License
This project is licensed under the ISC License.
