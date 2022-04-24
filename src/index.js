import ReactDom from 'react-dom';
import React from 'react';
import axios from "axios";

import registerServiceWorker from "./core/sw/registerSW";
import Wrapper from "./main/Wrapper";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/Global.scss';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {api_config} from "./config";
import {getAuthAccessToken, getAuthRefreshToken, setAuthTokens} from "./core/helpers/LocalStorageManager";

// MAIN CONFIG

axios.defaults.baseURL = api_config.host;
axios.defaults.headers.common['Authorization'] = getAuthAccessToken() ? `Bearer ${getAuthAccessToken()}` : null;
axios.defaults.headers.common['Accept'] = 'application/json';

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axios.post('/api/auth/refresh',{"refresh_token":getAuthRefreshToken()}).then(tokenRefreshResponse => {

    setAuthTokens({
        accessToken: tokenRefreshResponse.data.token,
        refreshToken: tokenRefreshResponse.data.refresh_token
    });

    failedRequest.response.config.headers['Authorization'] = 'Bearer ' +  tokenRefreshResponse.data.data.token;
    axios.defaults.headers.common['Authorization'] = "Bearer " +  tokenRefreshResponse.data.data.token;
    return Promise.resolve();
});



// Instantiate the interceptor
createAuthRefreshInterceptor(axios, refreshAuthLogic);


ReactDom.render(
        <Wrapper/>, document.getElementById('wrapper'));

registerServiceWorker();
