import ApiError from "@/utils/ApiError";
import * as process from "process";

export const ENVIRONMENT = process.env.APP_ENV || "development";
export const IS_PRODUCTION = ENVIRONMENT === "production";
export const IS_TEST = ENVIRONMENT === "test";
export const APP_PORT = Number(process.env.APP_PORT) || 9000;
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || "/";
export const JWT_SECRET = process.env.JWT_SECRET || "thT9x1TP9y2022Serv1ceis";
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "1d";
export const DB = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_USER_PWD,
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
  PORT: Number(process.env.DB_PORT) || 27017,
};
export const DB_URI =
  process.env.DB_URI || "mongodb://localhost:27017/taxitpay";
export const APP_NAME = "Client Service";
export const APP_URL = process.env.APP_URL;

export const breakPoint = () => {
  throw new ApiError(200, "break point");
};