import { ANSWER_VARIANT } from "@/enums/AnswerVariantEnum"
import classNames from "classnames"
import { ButtonHTMLAttributes } from "react"

interface AnswerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    answer: string
    variant?: ANSWER_VARIANT
}

const Answer = ({ answer, variant = ANSWER_VARIANT.DEFAULT, ...props }: AnswerProps) => {
    const buttonStyle = classNames('text-text bg-card-background text-center py-2 rounded-lg font-bold border-2 border-card-background disabled:pointer-events-none disabled:opacity-50', {
        'text-white bg-card-background-selected border-complementary': variant === ANSWER_VARIANT.SELECTED,
        'text-primary bg-white border-green-400': variant === ANSWER_VARIANT.CORRECT,
        'text-primary bg-white border-red-400': variant === ANSWER_VARIANT.FALSE,
    });

    return (
        <button className={buttonStyle} {...props}>
            {answer}
        </button>
    )
}

export default Answer