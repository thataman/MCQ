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
  testId: string;
  title: string;
  timeLimit: number;
  questions: Question[];
}

interface userSelection {
  testid: string;
  answers: { [key: string]: string }; 
}

interface stateAfterTestSubmit {
  testId: string;
  correctAnswers: number;
  explanations: { [key: string]: { correct_option: string; explanation: string } }; 
}

interface Test {
  time: string;
  setTime: (time: string) => void;
  keyword: string[];
  setKeywords: (keyword: string[]) => void;
  removeKeywords: () => void;
  question: responseFromApi;
  setQuestion: (questions: responseFromApi) => void;
  userSelection?: userSelection;
  // This can be used to store user's selected answers for the test
  setUserSelectedAnswer : ( answer: { [key: string]: string },testid:string) => void;
  removeUserSelectedAnswer: (answer: { [key: string]: string },testid:string) => void;
  stateAfterTestSubmit?: stateAfterTestSubmit;
  setStateAfterTestSubmit?: (state: stateAfterTestSubmit) => void;
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
    testId: "",
    title: "",
    timeLimit: 0,
    questions: []
  } as responseFromApi,
  setQuestion: (questions) => set(() => ({ question: questions })),


  userSelection: undefined,
  setUserSelectedAnswer: (answer,testid) => set((state) => ({ userSelection: { 
    testid: testid,
    answers: { ...state.userSelection?.answers, ...answer }
  } })),
  removeUserSelectedAnswer: (answer,testid) => set((state) => {
    const updatedAnswers = { ...state.userSelection?.answers };
    Object.keys(answer).forEach(key => {
      delete updatedAnswers[key];
    });
    return { userSelection: { testid: testid, answers: updatedAnswers } };

  }),

  stateAfterTestSubmit: undefined,
  setStateAfterTestSubmit: (state) => set(() => ({ stateAfterTestSubmit: state })),

}));