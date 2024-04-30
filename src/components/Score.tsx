import { Button } from "./ui/Button"

interface ScorePorps {
    score: number
    reset: () => void
}

const Score = ({ score, reset }: ScorePorps) => {
    return (
        <div className="text-white relative flex-1 justify-center flex flex-col gap-5">
            <h3 className="text-4xl">Your total score was:</h3>
            <h1 className="text-9xl">{score}</h1>
            <div className="absolute bottom-0 left-1/2 translate-x-[-50%]">
                <Button size="lg" onClick={reset}>Try again</Button>
            </div>
        </div>
    )
}

export default Score