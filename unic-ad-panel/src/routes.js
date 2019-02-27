import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Common from "./views/sveden/common.vue";
import News from "./views/News.vue";
import AddNews from "./views/AddNews.vue";
import Struct from "./views/sveden/struct.vue";
import EduAccred from "./views/sveden/eduAccred.vue";
import Education from "./views/sveden/education.vue";
import EduChislen from "./views/sveden/eduChislen.vue";
import EduPerevod from "./views/sveden/eduPerevod.vue";
import EduPriem from "./views/sveden/eduPriem.vue";
import Vacant from "./views/sveden/vacant.vue";
import TeachingStaff from "./views/sveden/teachingStaff.vue";
import GraduateJob from "./views/sveden/graduateJob.vue";
import Pages from "./views/pages.vue";
import Upload from "./views/upload.vue";

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
    { path: "/addnews", name: "AddNews", component: AddNews },
    { path: "/sveden/common", name: "Common", component: Common },
    { path: "/sveden/struct", name: "Struct", component: Struct },
    { path: "/sveden/eduaccred", name: "EduAccred", component: EduAccred },
    { path: "/sveden/education", name: "Education", component: Education },
    { path: "/sveden/educhislen", name: "EduChislen", component: EduChislen },
    { path: "/sveden/eduperevod", name: "EduPerevod", component: EduPerevod },
    { path: "/sveden/edupriem", name: "EduPriem", component: EduPriem },
    { path: "/sveden/vacant", name: "Vacant", component: Vacant },
    { path: "/sveden/employees", name: "TeachingStaff", component: TeachingStaff },
    { path: "/sveden/grants", name: "GraduateJob", component: GraduateJob },
    { path: "/pages", name: "Pages", component: Pages },
    { path: "/upload", name: "upload", component: Upload }
];
