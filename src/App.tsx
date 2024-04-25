import LeftPanel from "./components/LeftPanel"
import Title from "./components/Title"
import Answer from "./components/Answer"
import { Button } from "./components/ui/Button"
import Timer from "./components/Timer"
import { fetcher } from "./utils/fetcher"
import useSWR from "swr"
import { AnswerType, Questions } from "./types/QuestionType"
import { useMemo, useState } from "react"
import { ANSWER_VARIANT } from "./enums/AnswerVariantEnum"


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerType[]>([])

  const nextButtonText = useMemo(() => {
    return isSubmitted ? 'Doorgaan' : 'Klaar!'
  }, [isSubmitted])

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
    return selectedAnswers.includes(answer) ? ANSWER_VARIANT.SELECTED : ANSWER_VARIANT.DEFAULT
  }

  const isDisabled = (answer: AnswerType) => {
    return selectedAnswers.length === 3 && !selectedAnswers.includes(answer)
  }

  const nextButtonVariant = () => {
    if (selectedAnswers.length === 3) {
      return 'highlight'
    }
    return 'default'
  }

  const validateAnswers = () => {
    if (selectedAnswers.length === 3) {
      setIsSubmitted(true)
      // const correctAnswers = questions[currentQuestion].answers.filter(answer => answer.correct)
      const selectedCorrectAnswers = selectedAnswers.filter(answer => answer.correct)
      console.log(selectedCorrectAnswers.length)
      // if (correctAnswers.length === selectedCorrectAnswers.length) {
      //   console.log('CORRECT')
      // } else {
      //   console.log('INCORRECT')
      // }
    }
  }

  return (
    <div className="bg-background h-screen w-screen overflow-hidde flex justify-center items-center">
      <div className="w-[65%] flex gap-4">
        <LeftPanel />
        <div className="border-[12px] border-secondary w-full rounded-2xl bg-primary flex flex-col gap-5   py-4 px-5 text-center">
          <Timer time={questions[currentQuestion].time_limit_s} />
          <Title title={questions[currentQuestion].question} />
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            {questions[currentQuestion].answers.map((answer, index) => (
              <Answer key={index} answer={answer.answer} variant={answerVariant(answer)} onClick={() => onAnswerClick(answer)} disabled={isDisabled(answer)} />
            ))
            }
          </div>
          <div className="flex flex-col gap-y-4 w-1/2 mx-auto">
            <Button onClick={() => validateAnswers()} variant={nextButtonVariant()}>{nextButtonText}</Button>
            {!isSubmitted && <Button>Geef me een tip...</Button>}
          </div>
        </div>
      </div>
    </div >
  )
}

export default App