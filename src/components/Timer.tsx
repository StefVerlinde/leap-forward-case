import { StopwatchSolid } from "@/assets/icons";
import { useEffect, useState } from "react";

interface TimerProps {
    time: number;
    timerEnd: () => void;
    pause?: boolean;
}

const Timer = ({ time, timerEnd, pause }: TimerProps) => {
    const [countdown, setCountdown] = useState(time);

    useEffect(() => {
        setCountdown(time);
    }, [time]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (!pause) {
            interval = setInterval(() => {
                setCountdown((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(interval as NodeJS.Timeout);
                        // Timout to prevent state update on unmounted component
                        setTimeout(timerEnd, 0);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };

    }, [pause, timerEnd]);

    const formattedNumber = countdown < 10 ? `0${countdown}` : countdown;

    return (<div className="text-primary bg-button-background rounded-2xl font-bold py-2 px-4 mx-auto border-b-[4px] border-primary border-opacity-80 flex items-center gap-2">
        <StopwatchSolid className="w-4 fill-primary" />
        0:{formattedNumber}
    </div>);
}

export default Timer