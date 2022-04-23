import React, {useContext, useEffect, useState} from "react"
import {version} from "../config";
import {Redirect, Route, useHistory, useLocation} from "react-router-dom";
import {toast} from "react-toastify";

import {ThemeProvider} from "styled-components";
import {OverLayerLoading} from "./helpers/Helper";
import axios from "axios";
import {
    getAuthUserData,
    isAuthTokens,
    removeAuthTokens,
    removeAuthUserData,
    setAuthTokens,
    setAuthUserData
} from "./helpers/LocalStorageManager";
import {routes} from "../main/routes";

const SystemContext = React.createContext(null);

export function useSystem() {
    return useContext(SystemContext);
}

export function System({children, ...props}) {

    const history = useHistory();
    const location = useLocation();

    const [loading_overlayer, setLoadingOverLayer] = useState(false);

    /* SECURITY */
    const [user, setUser] = useState(getAuthUserData());
    const [isAuth, setAuth] = useState(isAuthTokens());

    const Login = ({accessToken, refreshToken}, user_data = null, redirectTo = '/') => {
        setUser(user_data);
        setAuth(true);

        setAuthUserData(user_data)
        setAuthTokens({
            accessToken:accessToken,
            refreshToken:refreshToken
        })

        axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken;

        history.push(redirectTo);
    };

    const updateUserData = user_data => {
        setAuthUserData(user_data);
        setUser(user_data);
    }

    const Logout = (redirectTo = location.pathname) => {
        removeAuthTokens();
        removeAuthUserData();
        axios.defaults.headers.common['Authorization'] = null;
        setAuth(false);
        history.push(redirectTo);
    };

    const isSuperAdmin = user?.roles.includes("ROLE_SUPER_ADMIN");



    const System = {
        Security: {
            isAuth,
            user,
            isSuperAdmin,
            Login,
            Logout,
            updateUserData
        },
        setLoadingOverLayer,
        version,
        ...props
    };

    useEffect(() => {

        const ListenerInterval = setInterval(() => {
            if (isAuth && !isAuthTokens()) {
                Logout('/');
            }
        }, 500);
        return () => {
            clearInterval(ListenerInterval);
        };
    }, [isAuth]);

    return (
        <SystemContext.Provider value={System}>
                <OverLayerLoading show={loading_overlayer}/>
                {children}
        </SystemContext.Provider>
    )
}



export function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches;
}


export function PrivateRoute({component: Component, ...rest}) {
    const System = useSystem();

    const location = useLocation();

    if (System.Security.isAuth) {
        return (
            <Route
                {...rest}
                render={props => {
                    return <Component {...props} />
                }}
            />
        )
    }else {
        useEffect(()=>{
            toast.error("For this action you need to log in!");
            },[]);
        return <Redirect to={{
            pathname: routes.login,
            state: { redirectTo: location.pathname }
        }}/>;
    }
}
