import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Abitur from "./components/Abitur.vue";
import Speciality from "./components/Speciality.vue";
import Contacts from "./components/Contacts.vue";
import Common from "./components/sveden/Common.vue";
import Struct from "./components/sveden/Struct.vue";
import Document from "./components/sveden/Document.vue";
import Education from "./components/sveden/Education.vue";
import EduStandarts from "./components/sveden/EduStandarts.vue";
import Employees from "./components/sveden/Employees.vue";
/*import Objects from "./components/sveden/Objects.vue"*/
import Grants from "./components/sveden/Grants.vue";
import PaidEdu from "./components/sveden/PaidEdu.vue";
import Budget from "./components/sveden/Budget.vue";
import Vacant from "./components/sveden/Vacant.vue";
import Login from "./components/admin/Login.vue";
import HiddenPage from "./components/admin/HiddenPage.vue";
//environment
import virtualTour from "./components/environment/virtualTour.vue";
import availability from "./components/environment/availability.vue";
import roadMap from "./components/environment/roadMap.vue";
import normative from "./components/environment/normative.vue";
import equipment from "./components/environment/equipment.vue";
import careerGuidance from "./components/environment/careerGuidance.vue";
import socialSupport from "./components/environment/socialSupport.vue";
import employment from "./components/environment/employment.vue";

export const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    { path: "/abitur", name: "Abitur", component: Abitur },
    { path: "/speciality", name: "Speciality", component: Speciality },
    { path: "/contacts", name: "Contacts", component: Contacts },
    { path: "/sveden/common", name: "Common", component: Common },
    { path: "/sveden/struct", name: "Struct", component: Struct },
    {
        path: "/sveden/document",
        name: "Document",
        component: Document
    },
    { path: "/sveden/education", name: "Education", component: Education },
    { path: "/sveden/eduStandarts", name: "EduStandarts", component: EduStandarts },
    {
        path: "/sveden/employees",
        name: "Employees",
        component: Employees
    },
    /*{ path: '/sveden/objects', name: 'Objects', component: Objects },*/
    { path: "/sveden/grants", name: "Grants", component: Grants },
    { path: "/sveden/paid_edu", name: "PaidEdu", component: PaidEdu },
    { path: "/sveden/budget", name: "Budget", component: Budget },
    { path: "/sveden/vacant", name: "Vacant", component: Vacant },
    { path: "/environment/virtual_tour", name: "virtualTour", component: virtualTour },
    { path: "/environment/availability", name: "availability", component: availability },
    { path: "/environment/road_map", name: "roadMap", component: roadMap },
    { path: "/environment/normative", name: "normative", component: normative },
    { path: "/environment/equipment", name: "equipment", component: equipment },
    { path: "/environment/career_guidance", name: "careerGuidance", component: careerGuidance },
    { path: "/environment/social_support", name: "socialSupport", component: socialSupport },
    { path: "/environment/employment", name: "employment", component: employment }
];
