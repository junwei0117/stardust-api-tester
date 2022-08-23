import * as dotenv from "dotenv";

dotenv.config();
export const HORNET_API_ENDPOINT: string = process.env.HORNET_API_ENDPOINT || `http://localhost:14265`
export const CHRONICLE_API_ENDPOINT: string = process.env.CHRONICLE_API_ENDPOINT || `http://localhost:9029`
