import React, {useState} from "react";
import './App.css';

function App() {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

            const res = await fetch("http://127.0.0.1:8000/api/ask/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_input: userInput})
        })

        const data = await res.json()
        setResponses(data.responses)
    }
    return (
        <div className={"app-container"}>
            <h1>Ask a question</h1>
            <form onSubmit = {handleSubmit}>
                <textarea
                    name = "user_input"
                    placeholder="Enter your prompt here..."
                    required
                    rows = "6"
                    cols = "60"
                    className = "prompt-box"
                    value = {userInput}
                    onChange={(e) => setUserInput(e.target.value)}>
                </textarea>

                <br />
                <button type = "submit"> Submit </button>
            </form>

            {responses && (
                <div className="response-box">
                    <h2>Responses:</h2>
                      {Object.entries(responses).map(([model, responseText]) => (
                        <div key={model} className="response-entry">
                          <h3>{model}</h3>
                          <p style={{ whiteSpace: 'pre-wrap' }}>{responseText}</p>
                        </div>
                      ))}
                </div>

            )}
        </div>
    );
}

export default App;
