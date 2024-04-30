import LeftPanel from "./components/LeftPanel"
import Title from "./components/Title"
import { Button } from "./components/ui/Button"
import Timer from "./components/Timer"
import { fetcher } from "./lib/fetcher"
import useSWR from "swr"
import { AnswerType, Questions } from "./types/QuestionType"
import { useState } from "react"


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerType[]>([])
  const { data: questions, error, isLoading } = useSWR<Questions>('/api', fetcher)

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
    return (selectedAnswers.length === 3 || isSubmitted) && !selectedAnswers.includes(answer)
  }

  const validateAnswers = () => {
    console.log('validated')
    setIsSubmitted(true)
    const selectedCorrectAnswers = selectedAnswers.filter(answer => answer.correct)
    setScore(prevScore => prevScore + selectedCorrectAnswers.length)
  }

  const handleNextQuestion = () => {
    console.log('next question')
    setCurrentQuestion(currentQuestion + 1)
    setSelectedAnswers([])
    setIsSubmitted(false)
  }


  const handleTimerEnd = () => {
    console.log("handle timer end")
    validateAnswers();
  }


  const handleButtonClicked = () => {
    console.log("button clicked")
    if (!isSubmitted) {
      validateAnswers();
    } else {
      handleNextQuestion();
    }
  }

  // ADD ERROR COMPONENT
  if (error || !questions) return <div>failed to load</div>
  // ADD SKELETON LOADER
  if (isLoading) return <div>loading...</div>

  return (
    <div className="bg-background h-screen w-screen overflow-hidde flex justify-center items-center">
      <div className="w-[65%] flex gap-4">
        <LeftPanel />
        <p>{score}</p>
        <div className="border-[12px] border-secondary w-full rounded-2xl bg-primary flex flex-col gap-5   py-4 px-5 text-center">
          <Timer time={questions[currentQuestion].time_limit_s - 10} timerEnd={() => handleTimerEnd()} pause={isSubmitted} />
          <Title title={questions[currentQuestion].question} />
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            {questions[currentQuestion].answers.map((answer, index) => (
              <Button key={index} variant={answerVariant(answer)} onClick={() => onAnswerClick(answer)} disabled={isDisabled(answer)}>{answer.answer}</Button>
            ))
            }
          </div>
          <div className="flex flex-col gap-y-4 w-1/2 mx-auto">
            <Button onClick={handleButtonClicked} variant={nextButtonVariant()}>{!isSubmitted ? "Klaar!" : "Doorgaan"}</Button>
            {!isSubmitted && <Button>Geef me een tip...</Button>}
          </div>
        </div>
      </div>
    </div >
  )
}

export default App