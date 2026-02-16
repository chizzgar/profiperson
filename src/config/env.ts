import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: normalizePort(process.env.PORT) ?? 3000,
  bcryptSaltRounds: normalizePositiveInt(process.env.BCRYPT_SALT_ROUNDS) ?? 10,
  jwtSecret: requireNonEmptyString(process.env.JWT_SECRET, "JWT_SECRET"),
  jwtExpiresIn: normalizeNonEmptyString(process.env.JWT_EXPIRES_IN) ?? "7d",
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

function normalizeNonEmptyString(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function requireNonEmptyString(value: string | undefined, name: string): string {
  const normalized = normalizeNonEmptyString(value);
  if (!normalized) {
    throw new Error(`${name} is required`);
  }
  return normalized;
}
