import express from 'express';
const app = express();
import { isNumber, isArrayOfNumbers } from './utils';
import { calculateBmi } from './bmiCalculator';
import { ExercisesData } from './interfaces';
import { calculateExercises } from './calculateExercises';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (
    !req.query.height ||
    !req.query.weight ||
    !isNumber(req.query.height) ||
    !isNumber(req.query.weight) ||
    Object.keys(req.query).length !== 2
  ) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
    return;
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);

  res.status(200).json({
    weight: weight,
    height: height,
    bmi: bmi,
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExercisesData;

  if (!daily_exercises || !target) {
    res.status(400).json({
      error: 'parameters missing',
    });
    return;
  }

  if (!isNumber(target) || !isArrayOfNumbers(daily_exercises)) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
    return;
  }

  const calculate = calculateExercises(daily_exercises, target);

  res.status(200).json(calculate);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
