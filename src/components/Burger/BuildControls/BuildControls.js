import React from 'react'
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    "Salad",
    "Bacon",
    "Cheese",
    "Meat"
]


export default function BuildControls({ingredientAdded, ingredientRemoved, disabled, price, purchaseable, ordered, isAuth}) {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl 
                        key={ctrl} 
                        label={ctrl} 
                        added={() => ingredientAdded(ctrl.toLowerCase())} 
                        removed={() => ingredientRemoved(ctrl.toLowerCase())} 
                        disabled={disabled[ctrl.toLowerCase()]}
                        />
                        
            })}
            <button className={classes.OrderButton} disabled={!purchaseable} onClick={ordered}>{isAuth ? `ORDER NOW` : `SIGN UP TO ORDER`}</button>
        </div>
    )
}
