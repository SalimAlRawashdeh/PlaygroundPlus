import React, {useState} from "react"
import "./ResponseBar.css"
import {usePreviousPrompts} from "./PreviousPrompts";

export default function ResponseBar({
                                        showResponseBar,
                                        responses,
                                        setResponse,
                                        setModel,
                                        setM,
                                        m,
                                        selectedModels,
                                        completedModels
                                    }) {

    const remainingModels = selectedModels.filter(model => !completedModels.includes(model));

    const handleClick = (model) => {
        setM(model)
    };

    return (
        showResponseBar && (
            <div className="responsebar">
                <ul>
                    {Object.entries(responses).map(([model, responseText]) => (
                        <li key={model}>
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

                    {remainingModels.length > 0 && (
                        remainingModels.map(model => (
                            <li key={model}>
                                <button className='loading'>
                                    {model}
                                </button>
                            </li>
                        ))
                    )}

                </ul>
            </div>
        )
    );
}
