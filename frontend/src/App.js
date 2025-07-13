import React, {useEffect, useState} from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PromptBar from "./components/PromptBar";
import ResponseBar from "./components/ResponseBar";

function App() {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState(null);
    const [model, setModel] = useState(null)
    const [response, setResponse] = useState(null);
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showResponseBar, setResponseBar] = useState(false)
    const [m, setM] = useState(null)
    const [sortLatest, setSortLatest] = useState(null)


    return (
        <>
            <Navbar/>
            <>

                <div className="main-content">
                    <Sidebar setResponses={setResponses}
                             reloadFlag={reloadFlag}
                             triggerResponseBar={() => setResponseBar(true)}
                             setResponse={setResponse}
                             setModel={setModel}
                             setM={setM}
                             setSortLatest={setSortLatest}
                             sortLatest={sortLatest}/>

                    <ResponseBar showResponseBar={showResponseBar}
                                 responses={responses}
                                 setResponse={setResponse}
                                 setModel={setModel}
                                 setM={setM}
                                 m={m}/>

                    <div className={"app-container"}>

                        <div className="sticky-bar-wrapper">
                            <PromptBar userInput={userInput}
                                       setUserInput={setUserInput}
                                       setResponses={setResponses}
                                       setSortLatest={setSortLatest}
                                       triggerSidebarReload={() => setReloadFlag(prev => !prev)}
                                       triggerResponseBar={() => setResponseBar(true)}
                            />
                        </div>

                        <div className={"content-wrapper"}>
                            {responses && (


                                <div className="response-box">
                                    <h2>{model}</h2>
                                    <div key={model} className="response-entry">
                                        <p style={{whiteSpace: 'pre-wrap'}}>{response}</p>
                                    </div>
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
