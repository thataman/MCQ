import { prisma as client, prisma } from "../utils/primaclient.js"
import { timer } from "../utils/timer.js"
import { Request, Response } from "express"
import { valkey } from "../utils/rislint.js"


type Query = { type: 'startsWith' | 'equals'; value: string };
export const getquestion = async (req: Request, res: Response):Promise<void> => {
    const { keywords, time, testid } = req.body
    const allotedtime = timer(time)
    if (allotedtime === 0) {
       res.json({ error: "Wrong time allotted" });
       return
    }

    

  type Query = {
  type: 'equals' | 'startsWith';
  value: string;
};

const queries: Query[] = keywords.map((key: string) =>
  key.length === 1
    ? { type: 'startsWith', value: key }
    : { type: 'equals', value: key }
);

let conditions: string[] = [];
let values: any[] = [];

queries.forEach((q, idx) => {
  const placeholder = `$${idx + 1}`;
  if (q.type === 'equals') {
    conditions.push(`"identifier_id" = ${placeholder}`);
    values.push(q.value);
  } else {
    conditions.push(`"identifier_id" LIKE ${placeholder}`);
    values.push(q.value + '%');
  }
});

if (conditions.length === 0) {
  throw new Error('No valid keywords provided.');
}

const whereClause = conditions.join(' OR ');

// Validate and parse limit
const limit = allotedtime
if (isNaN(limit) || limit <= 0) throw new Error('Invalid limit');

// Final query string with LIMIT as the last placeholder
const rawQuery = `
  SELECT * FROM "Question"
  WHERE ${whereClause}
  ORDER BY RANDOM()
  LIMIT $${values.length + 1}
`;

// Add limit to values array
values.push(limit);

// Execute raw query safely
const questions: any = await client.$queryRawUnsafe(rawQuery, ...values);

      
      
      
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
      const testidtoString = JSON.stringify(testid)
      valkey.set(testidtoString, JSON.stringify(answersexplanation));
   res.status(200).json(withoutanswer)
return
}

interface answermap{
correct_option:string , 
explanation : string
}

interface answerobject{
  [id:string] : answermap
}

export const verifyquestion = async(req:Request,res:Response):Promise<void>=>{
    const {answer ,testid} = req.body
    const testidtoString = JSON.stringify(testid)
    
    
    let verifiedAnswers
    const verifiedAnswersString = await valkey.get(testidtoString)
    if (verifiedAnswersString) {
     verifiedAnswers = JSON.parse(verifiedAnswersString)
    }
    console.log(verifiedAnswers);
    
//     let verifiedAnswers 
//     console.log(verifiedAnswersString);
    
//      if (verifiedAnswersString) {
//         verifiedAnswers = JSON.parse(verifiedAnswersString || "{}"); 
//      }






if(!verifiedAnswers){
 res.json("ansers not found")
 return
}
let count = 0;
for(const answerval in answer){
    if(answer[answerval] === verifiedAnswers[answerval]?.correct_option ){
        count++
    }
}

     res.status(200).json({count})
     return
}