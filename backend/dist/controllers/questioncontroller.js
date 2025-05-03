"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyquestion = exports.getquestion = void 0;
const primaclient_1 = require("../utils/primaclient");
const timer_1 = require("../utils/timer");
const rislint_1 = require("../utils/rislint");
const getquestion = async (req, res) => {
    const { keywords, time, testid } = req.body;
    const allotedtime = (0, timer_1.timer)(time);
    if (allotedtime === 0) {
        res.json({ error: "Wrong time allotted" });
        return;
    }
    const queries = keywords.map((key) => {
        if (key.length === 1) {
            return { type: 'startsWith', value: key };
        }
        else {
            return { type: 'equals', value: key };
        }
    });
    let conditions = [];
    let values = [];
    queries.forEach((q, idx) => {
        const placeholder = `$${idx + 1}`;
        if (q.type === 'equals') {
            conditions.push(`"identifier_id" = ${placeholder}`);
            values.push(q.value);
        }
        else {
            conditions.push(`"identifier_id" LIKE ${placeholder}`);
            values.push(q.value + '%');
        }
    });
    const whereClause = conditions.join(' OR ');
    const questions = await primaclient_1.prisma.$queryRaw(`
        SELECT * FROM "question"
        WHERE ${whereClause}  // Dynamic WHERE condition
        ORDER BY RANDOM()  // Randomize the results
        LIMIT ${allotedtime};  // Limit the number of results (based on allotted time)
        `, ...values // Spread the values for parameterized query
    );
    const withoutanswer = questions.map((e) => ({
        "id": e.id,
        "question": e.question,
        "options": e.options
    }));
    // const answers = questions.reduce(
    //     (acc: { [key: number]: string }, { id, correct_option }: { id: number; correct_option: string }) => {
    //       acc[id] = correct_option;  
    //       return acc; 
    //     },
    //     {} 
    //   );
    const answersexplanation = questions.reduce((acc, question) => {
        const { id, correct_option, explanation } = question;
        acc[id] = { correct_option, explanation
        };
        return acc;
    }, {});
    rislint_1.valkey.set(testid, answersexplanation);
    res.status(200).json(withoutanswer);
    return;
};
exports.getquestion = getquestion;
const verifyquestion = async (req, res) => {
    const { answer, testid } = req.body;
    const verifiedAnswersString = await rislint_1.valkey.get(testid);
    let verifiedAnswers;
    if (verifiedAnswersString) {
        verifiedAnswers = JSON.parse(verifiedAnswersString);
    }
    if (!verifiedAnswers) {
        res.json("ansers not found");
        return;
    }
    let count = 0;
    for (const answerval in answer) {
        if (answer[answerval] === verifiedAnswers[answerval].correct_option) {
            count++;
        }
    }
    res.status(200).json({ count });
    return;
};
exports.verifyquestion = verifyquestion;
