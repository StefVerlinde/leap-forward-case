import LeftPanel from "./components/LeftPanel"
import Timer from "./components/Timer"
import { fetcher } from "./lib/fetcher"
import useSWR from "swr"
import { AnswerType, Questions } from "./types/QuestionType"
import { useState } from "react"
import Score from "./components/Score"
import ConfettiContainer from "./components/ConfettiContainer"
import Title from "./components/Title"
import { Button } from "./components/ui/Button"


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerType[]>([])
  const { data: questions, error, isLoading } = useSWR<Questions>('/api', fetcher)

  // ADD ERROR COMPONENT
  if (error || !questions) return <div>failed to load</div>
  // ADD SKELETON LOADER
  if (isLoading) return <div>loading...</div>

  const onAnswerClick = (answer: AnswerType) => {
    if (selectedAnswers.includes(answer)) {
      setSelectedAnswers(selectedAnswers.filter(selectedAnswer => selectedAnswer !== answer))
      return
    }
    if (selectedAnswers.length === 3) return
    setSelectedAnswers([...selectedAnswers, answer])
  }

  const answerVariant = (answer: AnswerType) => {
    if (selectedAnswers.includes(answer)) {
      if (isSubmitted) {
        if (answer.correct) {
          return 'cardCorrect'
        }
        return 'cardFalse'
      }
      return 'cardSelected'
    }
    return 'card'
  }

  const nextButtonVariant = () => {
    if (selectedAnswers.length === 3 || isSubmitted) {
      return 'highlight'
    }
    return 'default'
  }

  const isDisabled = (answer: AnswerType) => {
    if (isSubmitted) return true
    return (selectedAnswers.length === 3) && !selectedAnswers.includes(answer)
  }

  const validateAnswers = () => {
    setIsSubmitted(true)
    const selectedCorrectAnswers = selectedAnswers.filter(answer => answer.correct)
    setScore(prevScore => prevScore + selectedCorrectAnswers.length)
  }

  const handleNextQuestion = () => {
    setSelectedAnswers([])
    setIsSubmitted(false)
    if (currentQuestion === questions.length - 1) {
      setIsFinished(true)
      return
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }
  const handleTimerEnd = () => {
    validateAnswers();
  }

  const handleButtonClicked = () => {
    if (!isSubmitted) {
      validateAnswers();
    } else {
      handleNextQuestion();
    }
  }

  const reset = () => {
    setIsSubmitted(false)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswers([])
    setIsFinished(false)
  }

  return (
    <div className="bg-background overflow-hidde flex justify-center items-center lg:h-screen lg:w-screen" >
      <div className="w-full flex flex-col-reverse lg:w-[1100px] lg:flex-row gap-4 lg:min-h-[600px]">
        <LeftPanel />
        <div className="relative border-[12px] border-secondary w-full rounded-2xl bg-primary flex flex-col gap-5 py-4 px-5 text-center min-h-[550px]">
          {!isFinished ? (
            <>
              <Timer time={questions[currentQuestion].time_limit_s} timerEnd={() => handleTimerEnd()} pause={isSubmitted} />
              <Title title={questions[currentQuestion].question} />
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <Button key={index} variant={answerVariant(answer)} onClick={() => onAnswerClick(answer)} disabled={isDisabled(answer)}>{answer.answer}</Button>
                  ))
                  }
                </div>
              </div>
              <div className="flex flex-col gap-y-4 w-1/2 mx-auto">
                <Button onClick={handleButtonClicked} variant={nextButtonVariant()}>{!isSubmitted ? "Klaar!" : "Doorgaan"}</Button>
                {!isSubmitted && <Button>Geef me een tip...</Button>}
              </div>
            </>
          ) : <Score score={score} reset={reset} />}
        </div>
      </div>
      {isFinished && <ConfettiContainer />}
    </div >
  )
}

export default App