import { Router} from "express";
import { getquestion,verifyquestion } from "../controllers/questioncontroller.js";


const questionrouter = Router()

questionrouter.post("/getquestion",getquestion)
questionrouter.post("/verifyAnswer",verifyquestion)
questionrouter.post("/hahahihisarojaman",(req,res)=>{res.json("working")})

export default questionrouter