import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";


export const routes = {

        home: {
            path: "/",
            component: HomeView
        },

        login: {
            path: "/login",
            component: LoginView
        }

    };