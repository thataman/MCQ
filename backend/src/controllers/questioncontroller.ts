import { prisma as client, prisma } from "../utils/primaclient"
import { timer } from "../utils/timer"
import { Request, Response } from "express"
import { valkey } from "../utils/rislint"



export const getquestion = async (req: Request, res: Response) => {
    const { keywords, time, testid } = req.body
    const allotedtime = timer(time)
    if (allotedtime === 0) {
        return res.json({ error: "Wrong time allotted" });
    }

    const queries = keywords.map((key: string) => {
        if (key.length === 1) {
          return { type: 'startsWith', value: key }; 
        } else {
          return { type: 'equals', value: key };  
        }
      });
      
      let conditions: string[] = [];
      let values: any[] = [];
      
      
      queries.forEach((q :any, idx :any) => {
        const placeholder = `$${idx + 1}`; 
        if (q.type === 'equals') {
          conditions.push(`"identifier_id" = ${placeholder}`);  
          values.push(q.value);
        } else {
          conditions.push(`"identifier_id" LIKE ${placeholder}`); 
          values.push(q.value + '%');  
        }
      });
      
      const whereClause = conditions.join(' OR '); 
      
      const questions = await client.$queryRaw(
        `
        SELECT * FROM "question"
        WHERE ${whereClause}  // Dynamic WHERE condition
        ORDER BY RANDOM()  // Randomize the results
        LIMIT ${allotedtime};  // Limit the number of results (based on allotted time)
        `,
        ...values  // Spread the values for parameterized query
      );
      
      
      
      
    const withoutanswer = questions.map((e:any) => ({
        "id": e.id,
        "question": e.question,
        "options": e.options
    }))
    const answers = questions.reduce(
        (acc: { [key: number]: string }, { quesid, ans }: { quesid: number; ans: string }) => {
          acc[quesid] = ans;  
          return acc; 
        },
        {} 
      );
      //saving th answr with tst id
      valkey.set(testid, answers);

    return res.status(200).json(withoutanswer)

}

export const verifyquestion = async(req:Request,res:Response)=>{
    const {answer,testid} = req.body
    const verifiedAnswersString = valkey.get(testid)

      const verifiedAnswers = JSON.parse(verifiedAnswersString); 



if(!verifiedAnswers){
return res.json("ansers not found")
}
let count = 0;
    //const verified answers=  redis.get(testid)
for(const answerval in answer){
    if(answerval.correct_option === verifiedAnswers[answerval.id]){
        count++
    }
}

    return res.status(200).json({count})
}