import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Common from "./views/sveden/common.vue";
import News from "./views/News.vue";

export const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    {
        name: "Login",
        path: "/login",
        component: () => import("@/views/Login"),
        meta: { authNotRequired: true }
    },
    { path: "/sveden/common", name: "Common", component: Common },
    { path: "/news", name: "News", component: News }
];
