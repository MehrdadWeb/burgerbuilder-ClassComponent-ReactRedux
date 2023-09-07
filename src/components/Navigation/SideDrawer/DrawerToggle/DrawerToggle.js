import React from 'react'
import classes from "./DrawerToggle.css";


export default function DrawerToggle({clicked}) {
    return (
        <div onClick={clicked} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
