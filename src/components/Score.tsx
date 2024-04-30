import { Button } from "./ui/Button"

interface ScorePorps {
    score: number
    reset: () => void
}

const Score = ({ score, reset }: ScorePorps) => {
    return (
        <div className="text-white flex flex-col items-center justify-center h-full">
            <h3 className="text-4xl">You're total score was:</h3>
            <h1 className="text-9xl">{score}</h1>
            <Button className="absolute bottom-5" size="lg" onClick={reset}>Try again</Button>
        </div>
    )
}

export default Score