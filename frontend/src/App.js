import React, {useEffect, useState} from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PromptBar from "./components/PromptBar";
import Spinner from "./components/Spinner";

function App() {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState(null);

    return (
        <>
            <Navbar/>
            <>

                <div className="main-content">
                    <Sidebar setResponses={setResponses}/>

                    <div className={"app-container"}>

                        <div className="sticky-bar-wrapper">
                            <PromptBar userInput={userInput} setUserInput={setUserInput} setResponses={setResponses}/>
                        </div>

                        <div className={"content-wrapper"}>

                            {responses && (
                                <div className="response-box">
                                    <h2>Responses:</h2>
                                    {Object.entries(responses).map(([model, responseText]) => (
                                        <div key={model} className="response-entry">
                                            <h3>{model}</h3>
                                            <p style={{whiteSpace: 'pre-wrap'}}>{responseText}</p>
                                        </div>
                                    ))}
                                </div>

                            )}
                            <br/>
                            <br/>

                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default App;
