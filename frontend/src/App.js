import React, {useEffect, useState} from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState(null);
    const [askedPrompts, setAskedPrompts] = useState([])

    const loadPrompts = async () => {
        const response = await fetch ("http://127.0.0.1:8000/api/get_prompts")
        const data = await response.json()
        setAskedPrompts(data.responses)
    }

    useEffect(() => {
        loadPrompts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkedBoxes = document.querySelectorAll('input[name=models]:checked')
        const chosenModels = Array.from(checkedBoxes).map(cb => cb.value)

        const res = await fetch("http://127.0.0.1:8000/api/ask/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_input: userInput,
                chosenModels: chosenModels
            })
        })

        const data = await res.json()
        setResponses(data.responses)

        loadPrompts();
    }
    return (
        <>
            <Navbar />
            <div className="main-content">
                <Sidebar />

                <div className={"app-container"}>
                    <h1>Ask a question</h1>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            name="user_input"
                            placeholder="Enter your prompt here..."
                            required
                            rows="6"
                            cols="60"
                            className="prompt-box"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}>
                        </textarea>

                        <div style={{display: "flex", gap: "1rem", marginTop: "1rem", justifyContent: "center"}}>
                            <label htmlFor="model">Choose a model:</label>

                            <label>
                                <input type="checkbox" name="models" value="Llama 3"/> Llama 3
                            </label>

                            <label>
                                <input type="checkbox" name="models" value="Titan Lite"/> Titan Lite
                            </label>
                            <label>
                                <input type="checkbox" name="models" value="Claude"/> Claude V2
                            </label>
                            <label>
                                <input type="checkbox" name="models" value="DeepSeek"/> DeepSeek-R1
                            </label><br/>
                        </div>

                        <br/>
                        <button type="submit"> Submit</button>
                    </form>

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

                    <div>
                        <h2>Previous Prompts</h2>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {askedPrompts.length === 0 ? (
                                <p>No prompts yet.</p>
                            ) : (
                                askedPrompts.map(item => (
                                    <button
                                        key={item.id}
                                        style={{
                                            margin: '0.5rem 0',
                                            padding: '0.5rem 1rem',
                                            cursor: 'pointer',
                                            minWidth: '200px', // optional to make buttons same width
                                        }}
                                        onClick={() => setResponses(item.response)}
                                    >
                                        {item.prompt.length > 30 ? item.prompt.slice(0, 30) + '...' : item.prompt}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}

export default App;
