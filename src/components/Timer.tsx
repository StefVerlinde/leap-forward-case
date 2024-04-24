import { useEffect, useState } from "react";

interface TimerProps {
    time: number;
}

const Timer = ({ time }: TimerProps) => {
    const [countdown, setCountdown] = useState(time);

    useEffect(() => {
        if (countdown === 0) {
            return;
        }

        const interval = setInterval(() => {
            setCountdown((prevTime) => {
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    const formattedNumber = countdown < 10 ? `0${countdown}` : countdown;

    return <div className="text-white">00:{formattedNumber}</div>;
}

export default Timer