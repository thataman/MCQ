import { prisma as client} from "../utils/primaclient.js"
import { timer } from "../utils/timer.js"
import { Request, Response } from "express"
import { valkey } from "../utils/rislint.js"
import generateSuperheroTestTitle from "../utils/testtitle.js"


type Query = { type: 'startsWith' | 'equals'; value: string };
export const getquestion = async (req: Request, res: Response):Promise<void> => {
    const { keywords, time, testid } = req.body
    
    
    const allotedtime = timer(time)
    if (allotedtime === 0) {
       res.status(400).json({ error: "Wrong time allotted" });
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
      console.log("before setex");
      
      const ttlSeconds = Math.floor((allotedtime + 5) * 60);
      await valkey.setex(testidtoString,ttlSeconds, JSON.stringify(answersexplanation) );
      console.log("after setex");
      const payload = {
        testId: testid,
        title: generateSuperheroTestTitle(),
        timeLimit: limit,
        questions: withoutanswer
      }
     // console.log("Generated test payload:", payload);
      
   res.status(200).json(payload)
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
    const {answers ,testid} = req.body || {}
    

        if (!testid) {
        res.status(400).json({error: "Test ID is required"});
        return;
    }

    console.log(req.body, "verifyquestion called");
    
    const testidtoString = JSON.stringify(testid)
    try {
      
      
      let verifiedAnswers;
      try {
          const verifiedAnswersString = await Promise.race([
              valkey.get(testidtoString),
              new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('Redis timeout')), 10000)
              )
          ]) as string | null;
          
          if (verifiedAnswersString) {
              verifiedAnswers = JSON.parse(verifiedAnswersString)
          }
      } catch (redisError) {
          console.error("Redis operation failed:", redisError);
          res.status(503).json({error: "Database temporarily unavailable"});
          return;
      }
      //console.log(verifiedAnswers);
      
  //     let verifiedAnswers 
  //     console.log(verifiedAnswersString);
      
  //      if (verifiedAnswersString) {
  //         verifiedAnswers = JSON.parse(verifiedAnswersString || "{}"); 
  //      }
  
  
  
  
  
  
  if(!verifiedAnswers){
   res.status(400).json("ansers not found")
   return
  }
  
  if(!answers){
      const payload = {
      testId: testid,
      correctAnswers: 0,
      explanations: verifiedAnswers
  }
    console.log(payload.correctAnswers);
    
       res.status(200).json(payload)
       return
    }
  // console.log(verifiedAnswers);
  
  
  let count = 0;
  if (answers) {
    for(const answerval in answers){
        if(answers[answerval] == verifiedAnswers[answerval]?.correct_option ){
            count++
        }
    }
  }
  
  const payload = {
      testId: testid,
      correctAnswers: count,
      explanations: verifiedAnswers
  }
    console.log(payload.correctAnswers);
    
       res.status(200).json(payload)
       return
    } catch (error) {
      console.error("Error in verifyquestion:", error);
      res.status(500).json({ error: "Internal server error" });
      return
      
    }
}