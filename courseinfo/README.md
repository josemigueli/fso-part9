# Course Info App

This project is a React application built with TypeScript as part of the Full Stack Open course (Part 9). It displays information about a course, including its parts, descriptions, and the total number of exercises. The project is structured to demonstrate TypeScript's type safety and React's component-based architecture.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Features
- Displays course information, including parts and descriptions.
- Calculates and displays the total number of exercises.
- Demonstrates TypeScript's type safety and discriminated unions.
- Responsive and modular component design.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/josemigueli/fso-part9.git
   cd fso-part9/courseinfo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`.

## Usage

The app displays a course titled "Half Stack application development" with the following parts:
- **Fundamentals**: Basic course part with a description.
- **Using props to pass data**: Group project-based course part.
- **Basics of type Narrowing**: Another basic course part with a description.
- **Deeper type usage**: Background course part with additional material.
- **TypeScript in frontend**: Basic course part with a description.
- **Backend development**: Special course part with requirements.

The total number of exercises is calculated and displayed at the bottom of the page.

## Scripts
- `npm run dev`: Starts the development server with Vite.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for code style issues.
- `npm run preview`: Previews the production build locally.

## Dependencies
- **Runtime**: `react`, `react-dom`
- **Development**: `@types/react`, `@types/react-dom`, `vite`, `typescript`, `eslint`

## License
This project is licensed under the ISC License.