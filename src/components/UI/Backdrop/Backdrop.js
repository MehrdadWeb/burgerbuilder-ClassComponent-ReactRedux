import React from 'react'
import classes from "./Backdrop.css";


export default function Backdrop({show, clicked}) {

    if(show) {
        return <div className={classes.Backdrop} onClick={clicked}></div>
    } else {
        return null;
    }

}
