import { useState } from "react";

const Form = () => {
  
  const topics = [
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
  

  const [selectedTopics, setSelectedTopics] = useState<{ [key: number]: boolean }>({});
  const [selectedSubtopics, setSelectedSubtopics] = useState<{ [key: string]: boolean }>({});

 
  const handleTopicChange = (topicId: number) => {
    setSelectedTopics(prevState => {
      const newState = { ...prevState };
      if (newState[topicId]) {
        delete newState[topicId];
      } else {
        newState[topicId] = true;
      }
      return newState;
    });
  };


  const handleSubtopicChange = (topicId: number, subtopicId: number) => {
    setSelectedSubtopics(prevState => {
      const newState = { ...prevState };
      const key = `${topicId}_${subtopicId}`;
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = true;
      }
      return newState;
    });
  };

  const generateKeywords = () => {
    const keywords: string[] = [];
    
  
    Object.keys(selectedTopics).forEach(topicId => {
      const topic = topics.find(t => t.id === parseInt(topicId));
      if (topic) {
     
        if (!Object.keys(selectedSubtopics).some(sub => sub.startsWith(topicId))) {
          keywords.push(topic.keyword);
        } else {
      
          topic.subtopics.forEach(subtopic => {
            const key = `${topicId}_${subtopic.id}`;
            if (selectedSubtopics[key]) {
              keywords.push(`${topic.keyword}${subtopic.keyword}`);
            }
          });
        }
      }
    });
    
    return keywords.join(", ");
  };

  return (
    <div>
      <h1>Select Topics and Subtopics</h1>

      <form>
        {topics.map((topic) => (
          <div key={topic.id}>
            <label>
              <input
                type="checkbox"
                checked={!!selectedTopics[topic.id]}
                onChange={() => handleTopicChange(topic.id)}
              />
              {topic.name}
            </label>

         
            {selectedTopics[topic.id] && (
              <div style={{ marginLeft: "20px" }}>
                {topic.subtopics.map((subtopic) => (
                  <label key={subtopic.id}>
                    <input
                      type="checkbox"
                      checked={!!selectedSubtopics[`${topic.id}_${subtopic.id}`]}
                      onChange={() => handleSubtopicChange(topic.id, subtopic.id)}
                    />
                    {subtopic.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </form>

    
      <div>
        <h2>Generated Keywords:</h2>
        <p>{generateKeywords()}</p>
      </div>
    </div>
  );
};

export default Form;
