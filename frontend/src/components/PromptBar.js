import "./Navbar.css"
import React, {useState} from "react";
import LLMSelect from "./LLMSelect";
import Spinner from "./Spinner";

export default function PromptBar({userInput, setUserInput, setResponses, triggerSidebarReload, triggerResponseBar}) {

    const [showImg, setShowImg] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkedBoxes = document.querySelectorAll('input[name=models]:checked')
        const chosenModels = Array.from(checkedBoxes).map(cb => cb.value)

        setShowImg(true)

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
        setShowImg(false)
        triggerSidebarReload();
        triggerResponseBar();
    }

    return (
        <div>
            <div className="prompt-bar-container">
                <div className="prompt-bar-inner">
                    <textarea
                        placeholder="Ask anything..."
                        className="prompt-box"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <LLMSelect/>
                </div>

            </div>
            <Spinner  showImg={showImg}/>
        </div>
    );
}