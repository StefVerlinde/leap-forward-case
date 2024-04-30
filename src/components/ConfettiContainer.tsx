import Confetti from 'react-confetti'

const ConfettiContainer = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
        <div className="fixed top-0 left-0">
            <Confetti
                width={width}
                height={height}
                recycle={true}
                numberOfPieces={300}
            />
        </div>
    )
}

export default ConfettiContainer