import { checkArgumentsLength, isNumber } from './utils';

const DAYS_OF_THE_WEEK: number = 7;

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface RatingData {
  rating: number
  description: string
}

const parseArguments = (args: string[]): number[] => {
  checkArgumentsLength(args.length, 9);

  if (
    isNumber(args[2]) &&
    isNumber(args[3]) &&
    isNumber(args[4]) &&
    isNumber(args[5]) &&
    isNumber(args[6]) &&
    isNumber(args[7]) &&
    isNumber(args[8])
  ) {
    return [
      Number(args[2]),
      Number(args[3]),
      Number(args[4]),
      Number(args[5]),
      Number(args[6]),
      Number(args[7]),
      Number(args[8]),
    ];
  }

  throw new Error('Provided values must be numbers');
};

const calculateRating = (average: number): RatingData => {
  if (average <= 1.5) {
    return {
      rating: 1,
      description: 'You should be ashamed',
    };
  }

  if (average >= 3.1) {
    return {
      rating: 3,
      description: 'Great job, never give up',
    };
  }

  return {
    rating: 2,
    description: 'Not too bad but could be better',
  };
};

export const calculateExercises = (
  hours: number[],
  target_amount: number
): Result | object => {
  if (hours.length !== DAYS_OF_THE_WEEK) {
    return {
      error: 'data for 7 days is required',
    };
  }

  const daysTrained = hours.filter((h) => {
    return h > 0;
  });

  const average = hours.reduce((a, b) => a + b, 0) / DAYS_OF_THE_WEEK;

  const getRating = calculateRating(average);

  const results: Result = {
    periodLength: DAYS_OF_THE_WEEK,
    trainingDays: daysTrained.length,
    success: average >= target_amount ? true : false,
    rating: getRating.rating,
    ratingDescription: getRating.description,
    target: target_amount,
    average: average,
  };

  return results;
};

if (require.main === module) {
  try {
    const args = parseArguments(process.argv);
    console.log(calculateExercises(args, 2));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

// 3 0 2 4.5 0 3 1
