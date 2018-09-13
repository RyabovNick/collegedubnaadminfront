import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Common from "./views/sveden/common.vue";
import News from "./views/News.vue";
import Struct from "./views/sveden/struct.vue";
import Vacant from "./views/sveden/vacant.vue";

export const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    {
        name: "Login",
        path: "/login",
        component: () => import("@/views/Login"),
        meta: { authNotRequired: true }
    },
    { path: "/news", name: "News", component: News },
    { path: "/sveden/common", name: "Common", component: Common },
    { path: "/sveden/struct", name: "Struct", component: Struct },
    { path: "/sveden/vacant", name: "Vacant", component: Vacant }
];
