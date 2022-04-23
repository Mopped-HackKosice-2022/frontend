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

    const System = {
        setLoadingOverLayer,
        version,
        ...props
    };

    useEffect(() => {

        const ListenerInterval = setInterval(() => {


        }, 500);
        return () => {
            clearInterval(ListenerInterval);
        };
    }, []);

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

