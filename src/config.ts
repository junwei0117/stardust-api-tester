import * as dotenv from "dotenv";

dotenv.config();
export const API_ENDPOINT: string = process.env.API_ENDPOINT || `http://localhost:14265`
export const ENABLE_EXPLORER: boolean = process.env.ENABLE_EXPLORER == "true" ? true : false || false
export const SPAMMER_ADDRESS: string[] = process.env.SPAMMER_ADDRESS?.split(", ") || []
export const LOGGER_LEVEL: string = process.env.LOGGER_LEVEL || `info`