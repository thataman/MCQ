import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import QuestionsList from './QuestionsList';
import QuestionDisplay from './QuestionDisplay';
import TestControls from './TestControls';
import Timer from './Timer';
import { Button } from '../ui/button';
import { ModeToggle } from '../mode-toggle';
import { useTest } from '@/store/test.store';
import StudentLoader from '../Loader';
import { verifyAnswers } from '@/api/Test';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;

  };
}

interface Test {
  testId: string;
  title: string;
  timeLimit: number;
  questions: Question[];
}

interface QuestionStatus {
  id: number;
  attempted: boolean;
  completed: boolean;
  selectedOption: string | null;
}

interface UserProgress {
  currentQuestionId: number;
  statusMap: Record<number, QuestionStatus>;
  startTime: number;
  timeRemaining: number;
}

interface userSelection {
  testid: string;
  answers: { [key: string]: string };
}

const TestPlatform = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(true);

  const test: Test = useTest(state => state.question);

  const setUserSelectedAnswer = useTest(state => state.setUserSelectedAnswer);
  const removeUserSelectedAnswer = useTest(state => state.removeUserSelectedAnswer);
  const userSelection = useTest(state => state.userSelection);

  const setStateAfterTestSubmit = useTest(state => state.setStateAfterTestSubmit);






  const firstQuestionId = test.questions[0]?.id || 0;

  const [progress, setProgress] = useState<UserProgress>({
    currentQuestionId: firstQuestionId,
    statusMap: {},
    startTime: Date.now(),
    timeRemaining: test.timeLimit * 60,
  });


  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const enterFullscreen = () => {
      if (!document.fullscreenElement && document.body.requestFullscreen) {
        document.body.requestFullscreen().catch(console.error);
      }
    };
   


  
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen); 
    };

    const blockKeys = (e: any) => {
      const blockedKeys = [
        "F11", "F12", "Tab", "Control", "Meta", "Alt",
        "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"
      ];

      const comboBlocked =
        (e.ctrlKey && ["r", "t", "w", "i", "u", "s"].includes(e.key.toLowerCase())) ||
        (e.key === "F5") ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase()));



      
      if (
        blockedKeys.includes(e.key) ||
        comboBlocked
      ) {
        e.preventDefault();
        console.log("Blocked:", e.key);
      }

      // Auto re-enter fullscreen on any key except Esc
if (e.key !== "Escape" && !document.fullscreenElement) {
        enterFullscreen();
      }



     
    };

    const blockContextMenu = (e: any) => {
      e.preventDefault();
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("keydown", blockKeys);
    window.addEventListener("contextmenu", blockContextMenu); // Block right-click

  
    enterFullscreen(); // Start fullscreen on load

    return () => {
     

      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", blockKeys);
      window.removeEventListener("contextmenu", blockContextMenu);
    };
  }, []);



  useEffect(() => {
    if (Object.keys(progress.statusMap).length === 0) {
      const initialStatusMap: Record<number, QuestionStatus> = {};

      test.questions.forEach(question => {
        initialStatusMap[question.id] = {
          id: question.id,
          attempted: false,
          completed: false,
          selectedOption: null,
        };
      });

      setProgress(prev => ({
        ...prev,
        statusMap: initialStatusMap,
      }));
    }
  }, [test, progress.statusMap]);

  if (!test || !test.questions || test.questions.length === 0) {
    return <StudentLoader loadingText='Loading test...' isVisible={!test} />;
  }

  if (loading) {
    return <StudentLoader loadingText='Submitting test...' isVisible={loading} />;
  }

  //console.log(progress, "progress in TestPlatform");


  const currentQuestion = test.questions.find(q => q.id === progress.currentQuestionId);
  const currentQuestionIndex = test.questions.findIndex(q => q.id === progress.currentQuestionId);
  const currentStatus = progress.statusMap[progress.currentQuestionId] || {
    id: progress.currentQuestionId,
    attempted: false,
    completed: false,
    selectedOption: null,
  };

  const isLastQuestion = currentQuestionIndex === test.questions.length - 1;

  const handleSelectQuestion = (questionId: number) => {
    setProgress(prev => ({
      ...prev,
      currentQuestionId: questionId,
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = test.questions[currentQuestionIndex - 1];
      handleSelectQuestion(prevQuestion.id);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      const nextQuestion = test.questions[currentQuestionIndex + 1];
      handleSelectQuestion(nextQuestion.id);
    }
  };

  const handleSelectOption = (optionKey: string) => {
    setProgress(prev => ({
      ...prev,
      statusMap: {
        ...prev.statusMap,
        [progress.currentQuestionId]: {
          id: progress.currentQuestionId,
          attempted: true,
          completed: true,
          selectedOption: optionKey,
        },
      },
    }));
    setUserSelectedAnswer({
      [progress.currentQuestionId.toString()]: optionKey,
    }, test.testId);
  };

  const handleClearOption = () => {
    setProgress(prev => ({
      ...prev,
      statusMap: {
        ...prev.statusMap,
        [progress.currentQuestionId]: {
          id: progress.currentQuestionId,
          attempted: false,
          completed: false,
          selectedOption: null,
        },
      },
    }));
    removeUserSelectedAnswer({
      [progress.currentQuestionId.toString()]: progress.statusMap[progress.currentQuestionId].selectedOption || '',
    }, test.testId);
  };

  const handleSubmit = async () => {
    /*  const totalQuestions = test.questions.length;
     const attempted = Object.values(progress.statusMap).filter(status => status.attempted).length;
     
     if (attempted < totalQuestions) {
       const confirmSubmit = window.confirm(
         `You have only attempted ${attempted} out of ${totalQuestions} questions. Are you sure you want to submit?`
       );
       if (!confirmSubmit) return;
     } */

    setLoading(true)
    const res = await verifyAnswers(userSelection as userSelection)
    if (res) {
      if (setStateAfterTestSubmit) {
        setStateAfterTestSubmit(res);
        setLoading(false)


        // save the state in session storage

        sessionStorage.setItem('testState', JSON.stringify({
          test: test,
          statusMap: progress.statusMap,
        }));

        //navigate to the results page
        navigate(`/test-results/${test.testId}`);

      }
    }




  };

  const handleTimeEnd = () => {
    alert('Time is up! Your test will be submitted automatically.');
    handleSubmit();
  };

  const handleManualEnter = () => {
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen().catch(console.error);
    }
  };

  const canGoPrevious = currentQuestionIndex > 0;
  const canGoNext = currentQuestionIndex < test.questions.length - 1;

  const overallQuestionNumber = currentQuestionIndex + 1;

  if (!currentQuestion) {
    return <StudentLoader loadingText='Loading question...' isVisible={!currentQuestion} />;
  }

  return (
   <div className="relative w-full h-screen select-none
 bg-white flex flex-col md:flex-row gap-6 p-3">


 {!isFullscreen && (
        <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        className="bg-white bg-center bg-no-repeat bg-cover p-8 rounded-lg shadow-lg text-black text-center w-full max-w-md mx-auto"
        style={{
          backgroundImage:  `url(https://ucarecdn.com/b57f0155-952b-4f96-be46-01ce99abd2c2/Screenshot20250726145256.png)`,
        }}
      >
<h1
  className="text-4xl font-extrabold text-black text-center"
  style={{
    textShadow: `
      -4px -4px 0 white,
      4px -4px 0 white,
      -4px 4px 0 white,
      4px 4px 0 white
    `,
  }}
>
  Fullscreen Required
</h1>



        <p className="mb-6"
        style={{
    textShadow: `
      -3px -3px 0 white,
      3px -3px 0 white,
      -3px 3px 0 white,
      3px 3px 0 white
    `,
  }}>Click below to re-enter fullscreen mode.</p>
        <button 
         onClick={handleManualEnter}
        className="bg-white text-black border border-black px-6 py-3 rounded-md font-semibold shadow hover:bg-gray-100 transition">
          Re-enter Fullscreen
        </button>
      </div>
    </div>

        </div>
      )}

      <div className="w-full md:w-1/3 lg:w-1/4 h-full flex flex-col space-y-4">
        <QuestionsList
          questions={test.questions}
          currentQuestionId={progress.currentQuestionId}
          statusMap={progress.statusMap}
          onSelectQuestion={handleSelectQuestion}
        />


      </div>

      <div className="w-full md:w-2/3 lg:w-3/4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">{test.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Question {overallQuestionNumber} of {test.questions.length}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Timer
              timeRemaining={progress.timeRemaining}
              onTimeEnd={handleTimeEnd}
              isPaused={isPaused}
            />
            <Button

              className=""
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <ModeToggle />
          </div>
        </div>

        <div className="flex-grow">
          <QuestionDisplay
            question={currentQuestion}
            questionNumber={overallQuestionNumber}
            status={currentStatus}
            onSelectOption={handleSelectOption}
          />
        </div>

        <TestControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          onClear={handleClearOption}
          onSubmit={handleSubmit}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          isLastQuestion={isLastQuestion}
          currentQuestionHasAnswer={currentStatus.selectedOption !== null}
        />
      </div>
    </div>
  );
};

export default TestPlatform;