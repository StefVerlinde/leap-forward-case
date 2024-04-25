import classNames from "classnames"
import { ButtonHTMLAttributes } from "react"

interface AnswerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    answer: string
    selected: boolean
}

const Answer = ({ answer, selected, ...props }: AnswerProps) => {
    const buttonStyle = classNames('text-text bg-card-background text-center py-2 rounded-lg font-bold border border-card-background disabled:pointer-events-none disabled:opacity-50', {
        'text-white bg-card-background-selected border-complementary': selected,
    });

    return (
        <button className={buttonStyle} {...props}>
            {answer}
        </button>
    )
}

export default Answer