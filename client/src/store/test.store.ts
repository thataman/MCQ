import { create } from 'zustand';



interface Option {
"A": string;
"B": string;
"C": string;
"D": string;
}

type Question = {
  question: string;
  options: Option;
  id: number;
}

interface responseFromApi {
  id: string;
  title: string;
  timeLimit: number;
  questions: Question[];
}

interface Test {
  time: string;
  setTime: (time: string) => void;
  keyword: string[];
  setKeywords: (keyword: string[]) => void;
  removeKeywords: () => void;
  question: responseFromApi;
  setQuestion: (questions: responseFromApi) => void;
}

/*

keyword : ["ab","bd","de"]


*/

// set the whole keywords as it comes in array of strings

export const useTest = create<Test>((set) => ({
  time: "15",
  setTime: (time) => set(() => ({ time })),
  
  keyword: [],
  setKeywords: (keyword) => set(() => ({ keyword })),
  removeKeywords() {
      set(() => {
        return { keyword: [] };  
      })
  },

  question:{
    id: "",
    title: "",
    timeLimit: 0,
    questions: []
  } as responseFromApi,
  setQuestion: (questions) => set(() => ({ question: questions }))
}));
