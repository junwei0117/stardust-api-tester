import * as dotenv from "dotenv";

dotenv.config();
export const API_ENDPOINT: string = process.env.API_ENDPOINT || `http://localhost:14265`
export const ENABLE_EXPLORER: boolean = process.env.ENABLE_EXPLORER == "true" ? true : false || false
export const ENABLE_CORE: boolean = process.env.ENABLE_CORE == "false" ? false : true || true
export const ENABLE_INDEXER: boolean = process.env.ENABLE_INDEXER == "false" ? false : true || true
export const SPAMMER_ADDRESS: string[] = process.env.SPAMMER_ADDRESS?.split(", ") || []
export const LOGGER_LEVEL: string = process.env.LOGGER_LEVEL || `info`