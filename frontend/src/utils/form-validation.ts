import validator from 'validator';

type InputType = string | null | undefined;

const required = (value: InputType) => !!value || 'Pole jest wymagane';

const isEmail = (value: InputType) => (!!value && validator.isEmail(value)) || 'Pole musi być emailem';

const passwordLength = (value: InputType) => (!!value && value.length >= 8) || 'Hasło musi składać się z co najmniej 8 znaków';

export const rules = {
  required,
  isEmail,
  passwordLength,
};
