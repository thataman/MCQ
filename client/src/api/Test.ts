import { generatePayload } from "@/types";
import axios from "axios";

const API_BASE_URL =  "http://localhost:3000";


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
