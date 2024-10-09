export const checkArgumentsLength = (length: number, compare: number) => {
  if (length < compare) throw new Error('Some arguments are missing');
  if (length > compare) throw new Error('Too many arguments');
};

export const isNumber = (argument: unknown): boolean => !isNaN(Number(argument));

export const isArrayOfNumbers = (arg: number[]): boolean => {
  return Array.isArray(arg) && arg.length > 0 && arg.every((item) => isNumber(item));
};
