import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import App from "./App.vue";
import router from "./router";
import store from "@/store";
import { CHECK_AUTH } from "@/store/actions.type";

import ApiService from "@/common/api.service";
import DateFilter from "@/common/date.filter";
import ErrorFilter from "@/common/error.filter";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);
Vue.use(Vuetify);

ApiService.init();
// Check auth before each page load
router.beforeEach((to, from, next) => {
    return Promise.all([store.dispatch(CHECK_AUTH)]).then(next);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
