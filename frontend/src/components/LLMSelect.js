import React, { useState } from "react";
import "./PromptBar.css";

export default function LLMSelect() {
    const [isDropDownDisplayed, setIsDropDownDisplayed] = useState(false);

    return (
        <div className="dropdown-wrapper">
            <button
                className="dropdown"
                onClick={() => setIsDropDownDisplayed((prev) => !prev)}
            >
                -- Select LLM --
            </button>

            {isDropDownDisplayed && (
                <div className="panel">
                    <label>
                        <input type="checkbox" name="models" value="Llama 3"/> Llama 3
                    </label>
                    <br/>
                    <label>
                        <input type="checkbox" name="models" value="Titan Lite"/> Titan Lite
                    </label>
                    <br/>
                    <label>
                        <input type="checkbox" name="models" value="Claude"/> Claude V2
                    </label>
                    <br/>
                    <label>
                        <input type="checkbox" name="models" value="DeepSeek"/> DeepSeek-R1
                    </label>
                </div>
            )}
        </div>
    );
}
