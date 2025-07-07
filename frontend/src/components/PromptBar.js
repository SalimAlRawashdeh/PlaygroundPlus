import "./Navbar.css"
import React from "react";

export default function PromptBar({userInput, setUserInput, setResponses}) {

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

    }

    return (
        <div className="prompt-bar-container">
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Ask anything..."
                    className="prompt-box"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    rows={1}
                />

                <div
                    style={{display: "flex", gap: "1rem", marginTop: "1rem", justifyContent: "center"}}>
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
        </div>
    );
}