import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
//import { CHECK_AUTH } from "@/store/actions.type";

/*import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";*/

//Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuetify);
/*
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);
*/
sync(store, router);

//ApiService.init();

/*router.beforeEach((to, from, next) => {
    return Promise.all([store.dispatch(CHECK_AUTH)]).then(next);
});*/

/*new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: { App }
});*/

const app = new Vue({
    store,
    router,
    ...App
});

export { app, router, store };
