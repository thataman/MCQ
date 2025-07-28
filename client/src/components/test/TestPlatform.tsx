/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { toast } from 'sonner';
import { TestAlert } from './warningmodal';

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

  
    enterFullscreen(); 

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

    setLoading(true);
    
    try {
        const res = await verifyAnswers(userSelection as userSelection);
        
        if (res) {
            if (setStateAfterTestSubmit) {
                setStateAfterTestSubmit(res);
                
                sessionStorage.setItem('testState', JSON.stringify({
                    test: test,
                    statusMap: progress.statusMap,
                }));

                toast.success("Test submitted successfully!");
                
                // Set loading to false before navigation
                setLoading(false);
                navigate(`/test-results/${test.testId}`);
            }
        } else {
            toast.error("Failed to submit test. Please try again.");
            setLoading(false);
            navigate(`/generate`);
        }
        
    } catch (error: any) {
        console.error("Error submitting test:", error);
        
        toast.error("Failed to submit test. Redirecting to generate page...");
  
        setTimeout(() => {
            setLoading(false);
            navigate(`/generate`);
        }, 2000);
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
  bg-primary-foreground/90 flex flex-col md:flex-row gap-2 p-3">




      {
        <TestAlert 
          open={!isFullscreen} 
          onEnterFullscreen={handleManualEnter} 
          onSubmitTest={handleSubmit} 
        />
      }

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