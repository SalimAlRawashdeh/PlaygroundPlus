import React, {useEffect, useState} from "react"
import "./Sidebar.css"
import {usePreviousPrompts} from "./PreviousPrompts";


function Sidebar({
                     setResponses,
                     reloadFlag,
                     triggerResponseBar,
                     setResponse,
                     setModel,
                     setM,
                     sortLatest,
                     setSortLatest
                 }) {
    const prompts = usePreviousPrompts(reloadFlag);
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (id) => {
        setActiveButton(id)
    };

    useEffect(() => {
        if (sortLatest && prompts.length > 0) {
            const latestIndex = prompts.length - 1;
            setActiveButton(latestIndex);

            const latestPrompt = prompts[latestIndex];
            const [firstModel, firstResponseText] = Object.entries(latestPrompt.response)[0];

            setModel(firstModel);
            setM(firstModel);
            setResponse(firstResponseText);
        }
    }, [sortLatest, prompts]);

    return (
        <div className="sidebar">
            <ul>
                {prompts.map((item, index) => (
                    <li key={item.id}>
                        <button
                            onClick={() => {
                                handleClick(index)
                                setResponses(item.response);
                                triggerResponseBar();
                                const [firstModel, firstResponseText] = Object.entries(item.response)[0];
                                setModel(firstModel)
                                setM(firstModel)
                                setResponse(firstResponseText)
                                setSortLatest(false)
                            }}
                            className={activeButton === index ? 'clicked' : ''}
                        >
                            {item.prompt.length > 25
                                ? item.prompt.slice(0, 25) + '...'
                                : item.prompt}
                        </button>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default Sidebar