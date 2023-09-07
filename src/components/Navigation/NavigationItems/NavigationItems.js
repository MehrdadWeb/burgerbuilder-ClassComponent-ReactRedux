import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem';

import classes from "./NavigationItems.css";

export default function NavigationItems({isAuth}) {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {   
                isAuth 
                ? <NavigationItem link="/orders">Orders</NavigationItem>
                : null
            }
            { 
                isAuth 
                ? <NavigationItem link="/logout">Logout</NavigationItem> 
                : <NavigationItem link="/auth">Authenticate</NavigationItem>
            }
        </ul>
    )
}
