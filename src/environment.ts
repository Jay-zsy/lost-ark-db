import path from 'path'
import * as dotenv from 'dotenv';

const ENV = process.env.NODE_ENV || "development";
const PATH = path.resolve(__dirname, "../.env." + ENV);
dotenv.config({ path: PATH });

export { ENV };
