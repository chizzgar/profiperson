import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: normalizePort(process.env.PORT) ?? 3000,
  bcryptSaltRounds: normalizePositiveInt(process.env.BCRYPT_SALT_ROUNDS) ?? 10,
};

function normalizePort(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const port = Number(value);
  if (!Number.isInteger(port) || port <= 0) {
    return undefined;
  }

  return port;
}

function normalizePositiveInt(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}
