import "./Navbar.css"
import React, {useState} from "react";
import LLMSelect from "./LLMSelect";
import Spinner from "./Spinner";

export default function PromptBar({userInput,
                                  setUserInput,
                                  setResponses,
                                  triggerSidebarReload,
                                  triggerResponseBar,
                                  setSortLatest,
                                  setSelectedModels,
                                  setCompletedModels}) {

    const [showImg, setShowImg] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkedBoxes = document.querySelectorAll('input[name=models]:checked')
        const chosenModels = Array.from(checkedBoxes).map(cb => cb.value)
        setSelectedModels(chosenModels)
        setCompletedModels([])

        if (checkedBoxes.length > 0) {
            setShowImg(true)
            setResponses({})

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

            const reader = res.body.getReader()
            const decoder = new TextDecoder("utf-8")
            let buffer = '';

            while (true) {
                const {value, done} = await reader.read()
                if (done) break

                buffer += decoder.decode(value, {stream : true})
                let parts = buffer.split('\n\n')

                for (let i = 0; i < parts.length - 1; i ++) {
                    let part = parts[i].trim()
                    if (part.startsWith('data: ')) {
                        const jsonStr = part.substring('data: '.length)
                        const parsed = JSON.parse(jsonStr)

                        const modelName = Object.keys(parsed)[0];
                        setCompletedModels(prev => [...prev, modelName]);

                        setResponses(prev => ({...prev, ...parsed}))
                    }
                }

                buffer = parts[parts.length - 1]
            }

            setShowImg(false)
            setSortLatest(true)
            setSelectedModels([])
            triggerSidebarReload();
            triggerResponseBar();
        }
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
                            if (e.key === "Enter" && !e.shiftKey && userInput.trim() !== "") {
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