import React from "react"
import "./ResponseBar.css"
import {usePreviousPrompts} from "./PreviousPrompts";


// {Object.entries(responses).map(([model, responseText]) => (
//                                         <div key={model} className="response-entry">
//                                             <h3>{model}</h3>
//                                             <p style={{whiteSpace: 'pre-wrap'}}>{responseText}</p>
//                                         </div>
//                                     ))}

export default function ResponseBar({ showResponseBar, responses, setResponse, setModel }) {
    return (
        showResponseBar && (
            <div className="responsebar">
                <ul>
                    {Object.entries(responses).map(([model, responseText]) => (
                        <li>
                            <button onClick={() => {
                                setResponse(responseText)
                                setModel(model)
                            }}>
                                {model}
                            </button>
                        </li>
                    ))}

                </ul>
            </div>
        )
    );
}
