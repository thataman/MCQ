import  Dotenv  from "dotenv";
import Valkey from "ioredis"
Dotenv.config()

const serviceUrl = process.env.serviceUri

export const valkey = new Valkey(serviceUrl ?? "");

