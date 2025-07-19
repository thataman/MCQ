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

interface Test {
  time: string;
  setTime: (time: string) => void;
  keyword: string[];
  setKeywords: (keyword: string[]) => void;
  removeKeywords: () => void;
  question: Question[];
  setQuestion: (questions: Question[]) => void;
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

  question: [],
  setQuestion: (questions) => set(() => ({ question: questions }))
}));
