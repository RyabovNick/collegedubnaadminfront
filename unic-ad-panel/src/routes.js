import Home from "./views/Home.vue";
import About from "./views/About.vue";

export const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    {
        name: "Login",
        path: "/login",
        component: () => import("@/views/Login")
    },
    {
        name: "settings",
        path: "/settings",
        component: () => import("@/views/Settings")
    }
];
