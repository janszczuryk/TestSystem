export enum AccountType {
  LEARNER = 'learner',
  TEACHER = 'teacher',
}

export type Account = {
  id: string;
  email: string;
  isVerified: boolean;
  type: AccountType,
};

export type AccountAuthorized = Account & {
  jwtToken: string;
};
