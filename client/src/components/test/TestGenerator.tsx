import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import StudentLoader from "../Loader";
import { useTest } from "@/store/test.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {generateTest} from "@/api/Test"
import {generateTestId} from "@/lib/utils"


interface Subtopic {
  id: number;
  name: string;
  keyword: string;
}

interface Topic {
  id: number;
  name: string;
  subtopics: Subtopic[];
  keyword: string;
}

const timeoptions = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
];



const availableTopics: Topic[] = [
  {
    id: 2,
    name: "Data Interpretation",
    keyword: "b",
    subtopics: [
      { id: 1, name: "table-charts", keyword: "a" },
      { id: 2, name: "bar-charts", keyword: "b" },
      { id: 3, name: "pie-charts", keyword: "c" },
      { id: 4, name: "line-charts", keyword: "d" },
    ],
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
      { id: 35, name: "odd-man-out-and-series", keyword: "I" },
    ],
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

  //const {setKeywords,keywords,removeKeywords} = useTest()

  /*

keyword : ["ab","bd","de"]


*/
const [isLoading, setIsLoading] = useState(false);
  const [keywords, setSelectedKeywords] = useState<string[]>([]);

  const [timeLimit, setTimeLimit] = useState("15");

  const {setKeywords,setTime,setQuestion} = useTest()

  const handleSubtopicToggle = (
    topicKeyword: string,
    subtopicKeyword: string
  ) => {
    const combinedKeyword = topicKeyword + subtopicKeyword;

    setSelectedKeywords((prev) => {
      if (prev.includes(combinedKeyword)) {
        return prev.filter((keyword) => keyword !== combinedKeyword);
      } else {
        return [...prev, combinedKeyword];
      }
    });
  };

const handleTestGenerate = async () => {
  try {
    setIsLoading(true);
    const testId = generateTestId();
    const payload = {
      keywords: keywords,
      time: timeLimit,
      testId: testId,
    };

    const response = await generateTest(payload);
    console.log("Test generated successfully:", response);
    
 
    setKeywords(keywords);
    setTime(timeLimit);
    setQuestion(response); 
    
    
    navigate("/test");
    
  } catch (error) {
    console.error("Error generating test:", error);
    
  } finally {
    setIsLoading(false);
  }
};





  return (
    <div className="">
      {isLoading && <StudentLoader isVisible={isLoading} loadingText="Generating Test Please Wait  ...." />}
      
      {/* Time Limit Selection */}
      <div className="flex justify-around items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 inline-block mr-2" />
            Select Time Limit
          </h2>
          <Select onValueChange={(value) => setTimeLimit(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Time Limit" />
            </SelectTrigger>
            <SelectContent>
              {timeoptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="" onClick={handleTestGenerate}>
          Generate Test
        </Button>

        <div></div>
      </div>

      <div className="mb-4 mt-20">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-6 w-6 " />
          Select Topics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTopics.map((topic) => (
            <PopoverComponent
              key={topic.id}
              functionf={handleSubtopicToggle}
              Topic={topic}
              keyWords={keywords}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestGenerator;

const PopoverComponent = ({
  Topic,
  functionf,
  keyWords,
}: {
  Topic: Topic;
  functionf: (topicKeyword: string, subtopicKeyword: string) => void;
  keyWords: string[];
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>{Topic.name}</Button>
      </PopoverTrigger>

      <PopoverContent className="w-[960px]">
        <div className="flex flex-wrap justify-between ">
          {Topic.subtopics.map((subtopic: Subtopic) => {
            return (
              <div className="w-60  my-1 items-center flex justify-between ">
                <div>
                  <Label htmlFor="subtopic">{subtopic.name}</Label>
                </div>
                <div className="">
                  <Checkbox
                    checked={keyWords.includes(
                      Topic.keyword + subtopic.keyword
                    )}
                    value={subtopic.keyword}
                    name={subtopic.name}
                    onCheckedChange={() =>
                      functionf(Topic.keyword, subtopic.keyword)
                    }
                    className=""
                    id="subtopic"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
