import React, {useEffect, useRef} from 'react';
import {ToastContainer, toast} from "react-toastify";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import {System} from "../core/System";
import DataProvider from "../core/DataProvider";
import NotFoundView from "./views/NotFoundView";
import {notifyUpdatedPWA} from "../core/sw/registerSW";
import {version} from "../config";
import {routes} from "./routes";

function Wrapper() {

    const history = useHistory();
    const main_container = useRef();

    useEffect(() => {

        notifyUpdatedPWA(() => {
            toast.info(`Aktualizované na verziu ${version}`);
        });

    }, []);


    return (
        <>
            <ToastContainer
                position={"top-right"}
                autoClose={3500}
                newestOnTop
                pauseOnFocusLoss={false}
                theme={"colored"}
            />
            <Router basename="/" history={history}>
                <System main_container={main_container}>
                    <DataProvider>

                        <main role="main" ref={main_container}>

                            <Switch>
                                <Route exact path={routes.home.path} component={routes.home.component}/>
                                <Route exact path={routes.login.path} component={routes.login.component}/>

                                <Route component={NotFoundView}/>
                            </Switch>

                        </main>

                    </DataProvider>
                </System>
            </Router>
        </>
    );
}

export default Wrapper;
