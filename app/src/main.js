import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuetify);

sync(store, router);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
