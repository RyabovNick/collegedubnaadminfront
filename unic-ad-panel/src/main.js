import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import { Upload } from 'element-ui';

import App from './App.vue';
import router from './router';
import store from '@/store';

import ApiService from '@/common/api.service';
import DateFilter from '@/common/date.filter';
import ErrorFilter from '@/common/error.filter';

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.filter('error', ErrorFilter);
Vue.use(Vuetify);
Vue.use(Upload);
Vue.use(mavonEditor);

ApiService.init();
// Check auth before each page load
router.beforeEach((to, from, next) => {
    const authRequired = !to.matched.some(route => route.meta.authNotRequired);
    store
        .dispatch('checkAuth')
        .then(() => {
            if (to.name === 'login') {
                next('/unic-ad-panel');
            }
            next();
        })
        .catch(() => {
            if (authRequired) {
                next('/unic-ad-panel/login');
            } else {
                next();
            }
        });
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
