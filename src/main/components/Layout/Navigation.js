import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {routes} from "../../routes";
import {css} from "@emotion/react";

function Navigation() {


    const location = useLocation();

    return (
        <nav>
            <ul>

                <li className={(location.pathname === routes.home.path) ? 'active' : ''}>
                    <Link to={routes.home.path}><i className="fas fa-home"/><small>Home</small></Link>
                </li>

                <li className={(location.pathname === routes.login.path) ? 'active' : ''}>
                    <Link to={routes.login.path}><i className="fas fa-home"/><small>Login</small></Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
