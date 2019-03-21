import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import common from "./common.module";
import news from "./news.module";
import newsFiles from "./newsFiles.module";
import struct from "./struct.module";
import eduAccred from "./eduAccred.module";
import education from "./education.module";
import eduChislen from "./eduChislen.module";
import eduPerevod from "./eduPerevod.module";
import eduPriem from "./eduPriem.module";
import objects from "./objects.module";
import vacant from "./vacant.module";
import teachingstaff from "./teachingstaff.module";
import graduatejob from "./grantsgj.module";
import pages from "./pages.module";
import eduStandarts from "./eduStandarts.module";
import purpose from "./purpose.module";
import gallery from "./gallery.module";
import environment from "./environment.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        common,
        news,
        newsFiles,
        struct,
        eduAccred,
        education,
        eduChislen,
        eduPerevod,
        eduPriem,
        objects,
        vacant,
        teachingstaff,
        graduatejob,
        pages,
        eduStandarts,
        purpose,
        gallery,
        environment
    }
    /*state: {},
    mutations: {},
    actions: {}*/
});
