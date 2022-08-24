import * as winston from "winston"
import { LOGGER_LEVEL } from "./config"

export const logger = winston.createLogger({
  level: LOGGER_LEVEL,
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});