import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: normalizePort(process.env.PORT) ?? 5000,
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
