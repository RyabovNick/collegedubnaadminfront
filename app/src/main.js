import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from "axios";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import App from "./App.vue";
import moment from "moment";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.$http = axios;
Vue.use(Vuetify);

Vue.filter("formatDate", value => {
    moment.locale("ru");
    if (value) {
        return moment(String(value)).format("DD MMMM YYYY");
    }
});

sync(store, router);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
