import { hashSync } from 'bcrypt';

export const DATASOURCE_INJECTION_TOKEN = 'DATABASE_CONNECTION';
export const PASSWORD_ROUNDS = 10;
export const JWT_EXPIRATION_IN_SECONDS = 86400;
export const MIN_PASSWORD_LENGTH = 8;
export const EXPENSE_CREATION_SENDER_EMAIL = 'otavio.n.morais@hotmail.com';
export const TESTING_JWT_SECRET = 'test-secret';
export const TESTING_USER_PASSWORD = 'batatadoce';
export const TESTING_USER_HASHED_PASSWORD = hashSync(
  TESTING_USER_PASSWORD,
  PASSWORD_ROUNDS,
);
