import validator from 'validator';

type InputValue = string | null | undefined;

const required = (value: InputValue) => !!value || 'Pole jest wymagane';

const isEmail = (value: InputValue) => (!!value && validator.isEmail(value)) || 'Pole musi być adresem email';

const isInteger = (value: InputValue) => (!!value && validator.isInt(value)) || 'Pole musi być liczbą całkowitą';

const passwordLength = (value: InputValue) => (!!value && value.length >= 8) || 'Hasło musi składać się z co najmniej 8 znaków';

const learnerNumber = (value: InputValue) => (!!value && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 1000) || 'Numer uczestnika musi być z przedziału (1-1000)';

export const rules = {
  required,
  isEmail,
  isInteger,
  passwordLength,
  learnerNumber,
};
