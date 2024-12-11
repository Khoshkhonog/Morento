import React, { useState, useEffect } from "react"
import PopOut, { PopOutProps } from "./pop-out"
function PopOutTest({ text }: { text: string }) {
    const [PopOuts, setPopOuts] = useState<JSX.Element[]>([]);
    useEffect(() => {
        const popOuts = PopOuts.concat(<PopOut text={`${text}`} delay={1000} duration={1000} />)
        setPopOuts(popOuts);
    }, [text]);
    return (
        <div>
            <div>popOutTest</div>
            {PopOuts !== null && PopOuts.length > 0 ? PopOuts : null}

        </div>
    );
}

export default PopOutTest