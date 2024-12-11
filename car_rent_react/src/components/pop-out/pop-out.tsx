import React, { useState, useEffect } from 'react';

export interface PopOutProps {
    text: string;
    delay: number; // delay in milliseconds before showing the pop-out
    duration: number; // duration in milliseconds before hiding the pop-out
    success?: boolean // indicates if the pop-out is a success message or failure
}


const PopOut: React.FC<PopOutProps> = ({ text, delay, duration, success = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [delay]);

    useEffect(() => {
        if (isVisible) {
            const timeoutId = setTimeout(() => {
                setIsVisible(false);
            }, duration);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isVisible, duration]);

    return <>
        <div className={`pop-out ${success ? 'green' : 'red'}`}
            style={{ display: isVisible ? 'block' : 'none' }}>{text}</div>
    </>
}
export default PopOut