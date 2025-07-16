import React, {useEffect, useState} from 'react'

export function usePreviousPrompts (trigger) {
    const [askedPrompts, setAskedPrompts] = useState([])
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const loadPrompts = async () => {
            const response = await fetch (`${API_BASE_URL}/api/get_prompts/`)
            const data = await response.json()

            const sorted = [... data.responses].sort(
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            )

            setAskedPrompts(sorted)
        }

        loadPrompts();
    }, [trigger]);


    return askedPrompts

}