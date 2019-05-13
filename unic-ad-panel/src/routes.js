import Home from './views/Home.vue';
import About from './views/About.vue';
import Common from './views/sveden/common.vue';
import AddNews from './views/AddNews.vue';
import AddNewsFiles from './views/addNewsFiles.vue';
import Struct from './views/sveden/struct.vue';
import EduAccred from './views/sveden/eduAccred.vue';
import Education from './views/sveden/education.vue';
import EduChislen from './views/sveden/eduChislen.vue';
import EduPerevod from './views/sveden/eduPerevod.vue';
import EduPriem from './views/sveden/eduPriem.vue';
import Vacant from './views/sveden/vacant.vue';
import TeachingStaff from './views/sveden/teachingStaff.vue';
import GraduateJob from './views/sveden/graduateJob.vue';
import GrantsDocs from './views/sveden/grantsDocs.vue';
import HostelInfo from './views/sveden/hostelinfo.vue';
import Pages from './views/pages.vue';
import EduStandarts from './views/sveden/eduStandarts.vue';
import Cabinets from './views/sveden/cabinets.vue';
import EduCabinets from './views/sveden/eduCabinets.vue';
import PurposeLibr from './views/sveden/purposeLibr.vue';
import PurposeEios from './views/sveden/purposeEios.vue';
import CarouselPhotos from './views/carouselPhotos.vue';
import FileUpload from './views/fileUpload.vue';
import History from './views/historyPages.vue';
import Environment from './views/environment/environment.vue';

export const routes = [
    { path: '/unic-ad-panel/', name: 'Home', component: Home },
    { path: '/unic-ad-panel/about', name: 'About', component: About },
    {
        name: 'Login',
        path: '/unic-ad-panel/login',
        component: () => import('@/views/Login'),
        meta: { authNotRequired: true },
    },
    { path: '/unic-ad-panel/addnews', name: 'AddNews', component: AddNews },
    { path: '/unic-ad-panel/addnewsfiles', name: 'AddNewsFiles', component: AddNewsFiles },
    { path: '/unic-ad-panel/sveden/common', name: 'Common', component: Common },
    { path: '/unic-ad-panel/sveden/struct', name: 'Struct', component: Struct },
    { path: '/unic-ad-panel/sveden/eduaccred', name: 'EduAccred', component: EduAccred },
    { path: '/unic-ad-panel/sveden/education', name: 'Education', component: Education },
    { path: '/unic-ad-panel/sveden/educhislen', name: 'EduChislen', component: EduChislen },
    { path: '/unic-ad-panel/sveden/eduperevod', name: 'EduPerevod', component: EduPerevod },
    { path: '/unic-ad-panel/sveden/edupriem', name: 'EduPriem', component: EduPriem },
    { path: '/unic-ad-panel/sveden/eduStandarts', name: 'EduStandarts', component: EduStandarts },
    { path: '/unic-ad-panel/sveden/cabinets', name: 'Cabinets', component: Cabinets },
    { path: '/unic-ad-panel/sveden/educabinets', name: 'EduCabinets', component: EduCabinets },
    { path: '/unic-ad-panel/sveden/purposelibr', name: 'PurposeLibr', component: PurposeLibr },
    { path: '/unic-ad-panel/sveden/purposeeios', name: 'PurposeEios', component: PurposeEios },
    { path: '/unic-ad-panel/sveden/vacant', name: 'Vacant', component: Vacant },
    { path: '/unic-ad-panel/sveden/employees', name: 'TeachingStaff', component: TeachingStaff },
    { path: '/unic-ad-panel/sveden/grants', name: 'GraduateJob', component: GraduateJob },
    { path: '/unic-ad-panel/sveden/grantsdocs', name: 'GrantsDocs', component: GrantsDocs },
    { path: '/unic-ad-panel/sveden/hostelinfo', name: 'HostelInfo', component: HostelInfo },
    { path: '/unic-ad-panel/pages', name: 'Pages', component: Pages },
    { path: '/unic-ad-panel/gallery', name: 'CarouselPhotos', component: CarouselPhotos },
    { path: '/unic-ad-panel/fileupload', name: 'FileUpload', component: FileUpload },
    { path: '/unic-ad-panel/history', name: 'History', component: History },
    { path: '/unic-ad-panel/environment', name: 'Environment', component: Environment },
];
