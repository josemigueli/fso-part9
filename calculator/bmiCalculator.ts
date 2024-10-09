import { checkArgumentsLength, isNumber } from './utils';

interface ValuesToCalculate {
  height: number
  weight: number
}

const categories: Array<{ min: number; max: number; category: string }> = [
  {
    min: 16.0,
    max: 16.9,
    category: 'Underweight (Moderate thinness)',
  },
  {
    min: 17.0,
    max: 18.4,
    category: 'Underweight (Mild thinness)',
  },
  {
    min: 18.5,
    max: 24.9,
    category: 'Normal range',
  },
  {
    min: 25.0,
    max: 29.9,
    category: 'Overweight (Pre-obese)',
  },
  {
    min: 30.0,
    max: 34.9,
    category: 'Obese (Class I)',
  },
  {
    min: 35.0,
    max: 39.9,
    category: 'Obese (Class II)',
  },
];

const parseArguments = (args: string[]): ValuesToCalculate => {
  checkArgumentsLength(args.length, 4);

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }

  throw new Error('Provided values must be numbers');
};

export const calculateBmi = (height: number, weight: number): string => {
  const calculate = weight / Math.pow(height / 100, 2);

  if (calculate <= 15.9) {
    return 'Underweight (Severe thinness)';
  }

  if (calculate >= 40) {
    return 'Obese (Class III)';
  }

  const check = categories.filter((c) => {
    return calculate >= c.min && calculate <= c.max;
  });

  if (check.length !== 1) {
    return 'No data available';
  }

  return check[0].category;
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
