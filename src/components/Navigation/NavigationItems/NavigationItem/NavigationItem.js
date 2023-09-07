import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from "./NavigationItem.css"

export default function NavigationItem({link, children, active}) {
    return (
            <li className={classes.NavigationItem}>
                <NavLink to={link} activeClassName={classes.active} exact>
                    {children}
                </NavLink>
            </li>
    )
}
