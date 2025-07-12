import React, {useState} from "react"
import "./ResponseBar.css"
import {usePreviousPrompts} from "./PreviousPrompts";

export default function ResponseBar({ showResponseBar, responses, setResponse, setModel, setM, m }) {
    const handleClick = (model) => {
        setM(model)
    };

    return (
        showResponseBar && (
            <div className="responsebar">
                <ul>
                    {Object.entries(responses).map(([model, responseText]) => (
                        <li key = {model}>
                            <button onClick={() => {
                                handleClick(model)
                                setResponse(responseText)
                                setModel(model)
                            }}
                            className={m === model ? 'clicked' : ''}
                            >
                                {model}
                            </button>
                        </li>
                    ))}

                </ul>
            </div>
        )
    );
}
