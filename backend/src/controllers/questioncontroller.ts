import { prisma as client, prisma } from "../utils/primaclient"
import { timer } from "../utils/timer"
import { Request, Response } from "express"
import { valkey } from "../utils/rislint"



export const getquestion = async (req: Request, res: Response):Promise<void> => {
    const { keywords, time, testid } = req.body
    const allotedtime = timer(time)
    if (allotedtime === 0) {
       res.json({ error: "Wrong time allotted" });
       return
    }

    const queries = keywords.map((key: string) => {
        if (key.length === 1) {
          return { type: 'startsWith', value: key }; 
        } else {
          return { type: 'equals' value: key };  
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
    // const answers = questions.reduce(
    //     (acc: { [key: number]: string }, { id, correct_option }: { id: number; correct_option: string }) => {
    //       acc[id] = correct_option;  
    //       return acc; 
    //     },
    //     {} 
    //   );
      const answersexplanation = questions.reduce(
        (acc: { [key: number]: {correct_option:string,explanation:string} }, question: { id: number ,correct_option :string,explanation: string }) => {
          const { id, correct_option, explanation } = question;
          acc[id] = {correct_option , explanation
            
          };  
          return acc; 
        },
        {} 
      );
      
      valkey.set(testid, answersexplanation);
   res.status(200).json(withoutanswer)
return
}

export const verifyquestion = async(req:Request,res:Response):Promise<void>=>{
    const {answer,testid} = req.body
    const verifiedAnswersString = await valkey.get(testid)
    let verifiedAnswers 
     if (verifiedAnswersString) {
        verifiedAnswers = JSON.parse(verifiedAnswersString); 
     }



if(!verifiedAnswers){
 res.json("ansers not found")
 return
}
let count = 0;
for(const answerval in answer){
    if(answer[answerval] === verifiedAnswers[answerval].correct_option){
        count++
    }
}

     res.status(200).json({count})
     return
}