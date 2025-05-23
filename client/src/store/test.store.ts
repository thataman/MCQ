import {create} from 'zustand'



interface Test{
    time:string,
    setTime:(time:string)=>void,
    keywords:string,
    setKeywords:(key:string) => void,
    removeKeywords:(key:string) => void,
    

}
const useTest = create()