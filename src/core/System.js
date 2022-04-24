import React, {useContext, useEffect, useState} from "react"
import {version} from "../config";

import {OverLayerLoading} from "./helpers/Helper";


const SystemContext = React.createContext(null);

export function useSystem() {
    return useContext(SystemContext);
}

export function System({children, ...props}) {

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

