import React from "react"
import "./Sidebar.css"
import {usePreviousPrompts} from "./PreviousPrompts";


function Sidebar({ setResponses }) {
    const prompts = usePreviousPrompts();

    return (
        <div className="sidebar">
            <ul>
                {prompts.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => setResponses(item.response)}
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