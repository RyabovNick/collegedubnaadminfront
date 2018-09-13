import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import common from "./common.module";
import news from "./news.module";
import struct from "./struct.module";
import vacant from "./vacant.module";
import teachingstaff from "./teachingstaff.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        common,
        news,
        struct,
        vacant,
        teachingstaff
    }
    /*state: {},
    mutations: {},
    actions: {}*/
});
