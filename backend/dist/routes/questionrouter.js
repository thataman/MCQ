"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questioncontroller_1 = require("../controllers/questioncontroller");
const questionrouter = (0, express_1.Router)();
questionrouter.post("/getquestion", questioncontroller_1.getquestion);
questionrouter.post("/verifyAnswer", questioncontroller_1.verifyquestion);
exports.default = questionrouter;
