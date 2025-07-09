import React, {useEffect, useState} from 'react'

export function usePreviousPrompts (trigger) {
    const [askedPrompts, setAskedPrompts] = useState([])

    useEffect(() => {
        const loadPrompts = async () => {
            const response = await fetch ("http://127.0.0.1:8000/api/get_prompts")
            const data = await response.json()
            setAskedPrompts(data.responses)
        }

        loadPrompts();
    }, [trigger]);


    return askedPrompts

}