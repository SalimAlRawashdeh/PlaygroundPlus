import React from "react"
import "./Sidebar.css"
import {usePreviousPrompts} from "./PreviousPrompts";


function Sidebar({ setResponses, reloadFlag, triggerResponseBar, setResponse, setModel }) {
    const prompts = usePreviousPrompts(reloadFlag);

    return (
        <div className="sidebar">
            <ul>
                {prompts.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => {
                                setResponses(item.response);
                                triggerResponseBar();
                                const [firstModel, firstResponseText] = Object.entries(item.response)[0];
                                setModel(firstModel)
                                setResponse(firstResponseText)
                            }}
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