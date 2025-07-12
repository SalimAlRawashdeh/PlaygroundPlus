import React, {useState} from "react"
import "./Sidebar.css"
import {usePreviousPrompts} from "./PreviousPrompts";


function Sidebar({ setResponses, reloadFlag, triggerResponseBar, setResponse, setModel, setM }) {
    const prompts = usePreviousPrompts(reloadFlag);
    const [activeButton, setActiveButton] = useState(null);
    const handleClick = (id) => {
        setActiveButton(id)
    };

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
                            }}
                            className = {activeButton === index ? 'clicked' : ''}
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