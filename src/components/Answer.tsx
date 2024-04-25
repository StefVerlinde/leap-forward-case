import classNames from "classnames"
import { useState } from "react"

interface AnswerProps {
    answer: string
    correct: boolean
}

const Answer = ({ answer, correct }: AnswerProps) => {
    console.log(correct)
    const [isSelected, setIsSelected] = useState(false)

    const selectAnswer = () => {
        setIsSelected(!isSelected)
    }

    const buttonStyle = classNames('text-text bg-card-background text-center py-2 rounded-lg font-bold border border-card-background', {
        'text-white bg-card-background-selected border-complementary': isSelected,
    });

    return (
        <button className={buttonStyle} onClick={selectAnswer}>
            {answer}
        </button>
    )
}

export default Answer