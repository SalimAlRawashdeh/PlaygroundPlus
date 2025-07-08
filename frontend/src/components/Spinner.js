import React, {useEffect, useState} from "react";
import "./Spinner.css"

export default function Spinner({ showImg }) {
    return (
        <>
            <div>
                {
                    showImg ? (
                        <img src="/spinner.svg" alt = "Loading..." className="spinner-img"/>
                    ) : (
                        <>
                        </>
                    )
                }
            </div>
        </>
    )
}