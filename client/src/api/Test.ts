import { generatePayload } from "@/types";
import axios from "axios";

const API_BASE_URL =  "https://mcq-6h1w.onrender.com";


export const generateTest = async (payload: generatePayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/question/getquestion`, 
     payload
    );
    return response.data;
  } catch (error) {
    console.error("Error generating test:", error);
    throw error;
  }
};

interface userSelection {
  testid: string;
  answers: { [key: string]: string }; 
}

export const verifyAnswers = async (payload: userSelection) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/question/verifyAnswer`, payload);
    return response.data;
  } catch (error) {
    console.error("Error verifying answers:", error);
    throw error;
  }
};
