import { error } from "console";
import  Dotenv  from "dotenv"
import {Redis} from "ioredis"
Dotenv.config()

const serviceUrl = process.env.serviceUri

if (!serviceUrl) {
    throw new Error("not got rwntials")
}
export const valkey = new Redis(serviceUrl);


