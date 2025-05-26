import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Settings } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from '../ui/slider';


interface Subtopic{
  id:number,
  name:string,
  keyword:string
}


interface Topic {
  id: number;
  name: string;
  subtopics: Subtopic[];
  keyword:string
}






const availableTopics: Topic[] =  [
   
    {
      id: 2,
      name: "Data Interpretation",
      keyword: "b",  
      subtopics: [
        { id: 1, name: "table-charts", keyword: "a" },
        { id: 2, name: "bar-charts", keyword: "b" },
        { id: 3, name: "pie-charts", keyword: "c" },
        { id: 4, name: "line-charts", keyword: "d" }
      ]
    },
     {
      id: 1,
      name: "Aptitude",
      keyword: "a",  
      subtopics: [
        { id: 1, name: "problems-on-trains", keyword: "a" },
        { id: 2, name: "time-and-distance", keyword: "b" },
        { id: 3, name: "height-and-distance", keyword: "c" },
        { id: 4, name: "time-and-work", keyword: "d" },
        { id: 5, name: "simple-interest", keyword: "e" },
        { id: 6, name: "compound-interest", keyword: "f" },
        { id: 7, name: "profit-and-loss", keyword: "g" },
        { id: 8, name: "partnership", keyword: "h" },
        { id: 9, name: "percentage", keyword: "i" },
        { id: 10, name: "problems-on-ages", keyword: "j" },
        { id: 11, name: "calendar", keyword: "k" },
        { id: 12, name: "clock", keyword: "l" },
        { id: 13, name: "average", keyword: "m" },
        { id: 14, name: "area", keyword: "n" },
        { id: 15, name: "volume-and-surface-area", keyword: "o" },
        { id: 16, name: "permutation-and-combination", keyword: "p" },
        { id: 17, name: "numbers", keyword: "q" },
        { id: 18, name: "problems-on-numbers", keyword: "r" },
        { id: 19, name: "problems-on-hcf-and-lcm", keyword: "s" },
        { id: 20, name: "decimal-fraction", keyword: "t" },
        { id: 21, name: "simplification", keyword: "u" },
        { id: 22, name: "square-root-and-cube-root", keyword: "v" },
        { id: 23, name: "surds-and-indices", keyword: "w" },
        { id: 24, name: "ratio-and-proportion", keyword: "x" },
        { id: 25, name: "chain-rule", keyword: "y" },
        { id: 26, name: "pipes-and-cistern", keyword: "z" },
        { id: 27, name: "boats-and-streams", keyword: "A" },
        { id: 28, name: "alligation-or-mixture", keyword: "B" },
        { id: 29, name: "logarithm", keyword: "C" },
        { id: 30, name: "races-and-games", keyword: "D" },
        { id: 31, name: "stocks-and-shares", keyword: "E" },
        { id: 32, name: "probability", keyword: "F" },
        { id: 33, name: "true-discount", keyword: "G" },
        { id: 34, name: "bankers-discount", keyword: "H" },
        { id: 35, name: "odd-man-out-and-series", keyword: "I" }
      ]
    },
    // {
    //   id: 3,
    //   name: "Science",
    //   keyword: "S",  
    //   subtopics: [
    //     { id: 1, name: "Physics", keyword: "P" },
    //     { id: 2, name: "Chemistry", keyword: "C" }
    //   ]
    // },
    // {
    //   id: 4,
    //   name: "Math",
    //   keyword: "M",  
    //   subtopics: [
    //     { id: 1, name: "Algebra", keyword: "A" },
    //     { id: 2, name: "Geometry", keyword: "G" }
    //   ]
    // }
  ];

const TestGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState<Topic | null>(null);
  const [selectedSubtopic,setSelectedSubtopic] = useState<Subtopic[]>([])
  const [timeLimit, setTimeLimit] = useState(15);
 

 /*  const handleTopicToggle = (subtopic: string) => {
    setSelectedTopics(prev => 
      prev.includes(subtopic)
        ? prev.filter(t => t !== subtopic)
        : [...prev, subtopic]
    );
  };
 */
  /* const handleGenerate = () => {
    // Here you would typically generate the test based on selections
    // For now, we'll just navigate to the test page
    navigate('/test');
  }; */

  return (
    <div className="max-w-4xl mx-auto py-1 px-4">
      <div className=" rounded-lg shadow-lg p-6 mb-8 animate-fade-in">
        
        
        <div className="space-y-8">
          {/* Topics Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              Select Topics
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableTopics.map(topic => (
                <PopoverComponent key={topic.id} Topic={topic}/>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-purple-600" />
              Time Limit (minutes)
            </h2>
            <Slider 
            className='cursor-grab h-5 '
            onValueChange={(value) => setTimeLimit(Number(value)) }
             defaultValue={[15]} max={60} step={15} min={15} />
            
            <div className="flex justify-between mt-2">
              <span>15 min</span>
              <span className="text-purple-600 font-medium">{timeLimit} min</span>
              <span>60 min</span>
            </div>
          </div>

         
        </div>

        {/* Generate Button */}
        {/* <div className="mt-8 flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={selectedTopics.length === 0}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform 
                     hover:scale-105 ${
                       selectedTopics.length > 0
                         ? 'bg-purple-600 text-white hover:bg-purple-700'
                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     }`}
          >
            Generate Test
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TestGenerator;



const PopoverComponent = ({Topic}:{Topic:Topic}) => {




  return(
    <Popover>
      <PopoverTrigger asChild>
      
      <Button variant={"outline"}>
        {Topic.name}
      </Button>

      </PopoverTrigger>

      <PopoverContent className='w-[960px]'>

      <div className='flex flex-wrap justify-between '>

        {
          Topic.subtopics.map((subtopic:Subtopic) => {
            return(
                 
                   
                    <div className='w-60  my-1 items-center flex justify-between '>
                      <div>
                      <Label htmlFor="subtopic">
                        {
                        subtopic.name
                        }
                        </Label>
                        </div> 
                        <div className=''>
                      <Checkbox className='' id="subtopic" />
                      </div>
                      
                    </div>
                
            )
          })
        }
      </div>

      </PopoverContent>
    </Popover>
  )

}