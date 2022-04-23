import React from 'react';
import {useSystem} from "../../core/System";
import axios from "axios";
import {toast} from "react-toastify";
import {useLocation} from "react-router-dom";


export default function LoginView() {

    const System = useSystem();
    const location = useLocation();

    const handleLogin = e => {
        e.preventDefault();

        if (e.target['username'].value.trim() !== '' && e.target['password'].value.trim() !== '') {

            System.setLoadingOverLayer(true);

            axios.post('/api/auth/email', {
                "username": e.target['username'].value,
                "password": e.target['password'].value
            }).then(r => {

                if (r.status === 200) {

                    System.Security.Login(
                        {accessToken: r.data.token, refreshToken: r.data.refresh_token},
                        r.data.user,
                        location.state ? location.state.redirectTo : "/"
                    );
                    System.setLoadingOverLayer(false);
                }

            }).catch(e => {
                console.log(e);
                toast.error('Incorrect credentials');
                System.setLoadingOverLayer(false);
            });
        }

    }


    return (
        <>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <input type="text" className="form-control" name="username" placeholder="Email"/>
                <input type="password" className="form-control" name="password" placeholder="Password"/>
                <button className="btn btn-primary">Login</button>
            </form>
        </>
    );

}

