import { useEffect, useState } from "react";
import StopwatchSolid from '../assets/icons/stopwatch-solid.svg?react'

interface TimerProps {
    time: number;
    timerEnd: () => void;
}

const Timer = ({ time, timerEnd }: TimerProps) => {
    const [countdown, setCountdown] = useState(time);

    useEffect(() => {
        setCountdown(time);
    }, [time]);

    useEffect(() => {
        if (countdown === 0) {
            timerEnd();
            return;
        }

        const interval = setInterval(() => {
            setCountdown((prevTime) => {
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown, timerEnd]);

    const formattedNumber = countdown < 10 ? `0${countdown}` : countdown;

    return (<div className="text-primary bg-button-background rounded-2xl font-bold py-2 px-4 mx-auto border-b-[4px] border-primary border-opacity-80 flex items-center gap-2">
        <StopwatchSolid className="w-4 fill-primary" />
        0:{formattedNumber}
    </div>);
}

export default Timer