import { Router } from "express";
import { getquestion, verifyquestion } from "../controllers/questioncontroller.js";
const questionrouter = Router();
questionrouter.post("/getquestion", getquestion);
questionrouter.post("/verifyAnswer", verifyquestion);
export default questionrouter;
