# Calculator API

This project is part of the Full Stack Open course (Part 9). It provides a simple API for calculating BMI (Body Mass Index) and exercise statistics. The project is built using TypeScript and Express.js.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [BMI Calculator](#bmi-calculator)
  - [Exercise Calculator](#exercise-calculator)
- [API Endpoints](#api-endpoints)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Features
- **BMI Calculator**: Calculates BMI based on height and weight inputs and provides a health category.
- **Exercise Calculator**: Analyzes exercise data over a week and provides statistics such as training days, average hours, and a rating.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/josemigueli/fso-part9.git
   cd fso-part9/calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile TypeScript files (if needed):
   ```bash
   tsc
   ```

## Usage

### BMI Calculator
To calculate BMI via the command line:
```bash
npm run calculateBmi -- <height in cm> <weight in kg>
```
Example:
```bash
npm run calculateBmi -- 180 75
```

### Exercise Calculator
To calculate exercise statistics via the command line:
```bash
npm run calculateExercises -- <target hours> <day1> <day2> <day3> <day4> <day5> <day6> <day7>
```
Example:
```bash
npm run calculateExercises -- 2 1 0 2 4.5 0 3 1
```

## API Endpoints

### Start the server:
```bash
npm start
```
or for development:
```bash
npm run dev
```

### Available Endpoints:
1. **GET /hello**
   - Returns a greeting message.
   - Example response:
     ```json
     "Hello Full Stack!"
     ```

2. **GET /bmi**
   - Calculates BMI based on query parameters `height` and `weight`.
   - Example request:
     ```
     GET /bmi?height=180&weight=75
     ```
   - Example response:
     ```json
     {
       "weight": 75,
       "height": 180,
       "bmi": "Normal range"
     }
     ```

3. **POST /exercises**
   - Analyzes exercise data and returns statistics.
   - Request body format:
     ```json
     {
       "daily_exercises": [1, 0, 2, 4.5, 0, 3, 1],
       "target": 2
     }
     ```
   - Example response:
     ```json
     {
       "periodLength": 7,
       "trainingDays": 5,
       "success": false,
       "rating": 2,
       "ratingDescription": "Not too bad but could be better",
       "target": 2,
       "average": 1.6428571428571428
     }
     ```

## Scripts
- `npm run calculateBmi`: Runs the BMI calculator via command line.
- `npm run calculateExercises`: Runs the exercise calculator via command line.
- `npm start`: Starts the Express server.
- `npm run dev`: Starts the server in development mode with `ts-node-dev`.
- `npm run lint`: Runs ESLint to check for code style issues.

## Dependencies
- **Runtime**: `express`, `ts-node`
- **Development**: `@types/express`, `eslint`, `ts-node-dev`, `typescript`

## License
This project is licensed under the ISC License.