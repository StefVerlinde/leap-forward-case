import LeftPanel from "./components/LeftPanel"
import Title from "./components/Title"
import Answer from "./components/Answer"
import { Button } from "./components/ui/Button"
import Timer from "./components/Timer"
import { fetcher } from "./utils/fetcher"
import useSWR from "swr"
import { AnswerType, Questions } from "./types/QuestionType"
import { useState } from "react"
import { ANSWER_VARIANT } from "./enums/AnswerVariantEnum"


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
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
          return ANSWER_VARIANT.CORRECT
        }
        return ANSWER_VARIANT.FALSE
      }
      return ANSWER_VARIANT.SELECTED
    }
  }

  const isDisabled = (answer: AnswerType) => {
    return (selectedAnswers.length === 3 || isSubmitted) && !selectedAnswers.includes(answer)
  }

  const nextButtonVariant = () => {
    if (selectedAnswers.length === 3) {
      return 'highlight'
    }
    return 'default'
  }

  const validateAnswers = () => {
    setIsSubmitted(true)
    const selectedCorrectAnswers = selectedAnswers.filter(answer => answer.correct)
    setScore(prevScore => prevScore + selectedCorrectAnswers.length)
  }

  const handleNextQuestion = () => {
    setIsSubmitted(false)
    setSelectedAnswers([])
    setCurrentQuestion(currentQuestion + 1)
  }

  const handleTimerEnd = () => {
    validateAnswers()
  }

  return (
    <div className="bg-background h-screen w-screen overflow-hidde flex justify-center items-center">
      <div className="w-[65%] flex gap-4">
        <LeftPanel />
        <p>{score}</p>
        <div className="border-[12px] border-secondary w-full rounded-2xl bg-primary flex flex-col gap-5   py-4 px-5 text-center">
          <Timer time={questions[currentQuestion].time_limit_s} timerEnd={handleTimerEnd} />
          <Title title={questions[currentQuestion].question} />
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            {questions[currentQuestion].answers.map((answer, index) => (
              <Answer key={index} answer={answer.answer} variant={answerVariant(answer)} onClick={() => onAnswerClick(answer)} disabled={isDisabled(answer)} />
            ))
            }
          </div>
          <div className="flex flex-col gap-y-4 w-1/2 mx-auto">
            {isSubmitted ? <Button onClick={() => handleNextQuestion()} variant="highlight">Doorgaan</Button> : <Button onClick={() => validateAnswers()} variant={nextButtonVariant()}>Klaar!</Button>}
            {!isSubmitted && <Button>Geef me een tip...</Button>}
          </div>
        </div>
      </div>
    </div >
  )
}

export default App