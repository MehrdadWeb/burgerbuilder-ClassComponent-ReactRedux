import React from 'react'
import classes from "./Button.css"

export default function Button({children, clicked, btnType, disabled}) {
    return (
        <button 
            onClick={clicked}
            className={[classes.Button, classes[btnType]].join(" ")}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
