import ApiService from "@/common/api.service";
import {
    FETCH_GRANTSGJ,
    NEW_GRANTSGJ,
    DELETE_GRANTSGJ,
    UPDATE_GRANTSGJ,
    FETCH_GRANTSDOCS,
    UPLOAD_GRANTSDOCS,
    DELETE_GRANTSDOCS,
    FETCH_HOSTELINFO,
    NEW_HOSTELINFO,
    DELETE_HOSTELINFO,
    UPDATE_HOSTELINFO
} from "./actions.type";
import { SET_GRANTSGJ, SET_GRANTSDOCS, SET_HOSTELINFO } from "./mutations.type";

export const state = {
    graduateJob: [],
    grantsDocs: [],
    hostelInfo: []
};

const getters = {
    graduateJob(state) {
        return state.graduateJob;
    },
    grantsDocs(state) {
        return state.grantsDocs;
    },
    hostelInfo(state) {
        return state.hostelInfo;
    }
};

export const actions = {
    [FETCH_GRANTSGJ](context) {
        return ApiService.get("graduatejob").then(({ data }) => {
            context.commit(SET_GRANTSGJ, data);
            return data;
        });
    },
    [NEW_GRANTSGJ](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/grants/graduatejob", params).then(function(response) {
            return response;
        });
    },
    [DELETE_GRANTSGJ](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/grants/graduatejob", params);
    },
    [UPDATE_GRANTSGJ](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/grants/graduatejob", params);
    },
    //grantsDocs
    [FETCH_GRANTSDOCS](context) {
        return ApiService.get("grantsDocs").then(({ data }) => {
            context.commit(SET_GRANTSDOCS, data);
            return data;
        });
    },
    [UPLOAD_GRANTSDOCS](context, { file }) {
        ApiService.setHeader();
        return ApiService.upload(`admin/upload/grantsdocs`, file).then(function(response) {
            return response;
        });
    },
    [DELETE_GRANTSDOCS](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/grants/grantsdocs", params);
    },

    //hostelinfo
    [FETCH_HOSTELINFO](context) {
        return ApiService.get("hostelinfo").then(({ data }) => {
            context.commit(SET_HOSTELINFO, data);
            return data;
        });
    },
    [NEW_HOSTELINFO](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/grants/hostelinfo", params).then(function(response) {
            return response;
        });
    },
    [DELETE_HOSTELINFO](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/grants/hostelinfo", params);
    },
    [UPDATE_HOSTELINFO](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/grants/hostelinfo", params);
    }
};

export const mutations = {
    [SET_GRANTSGJ](state, graduateJob) {
        state.graduateJob = graduateJob;
    },
    [SET_GRANTSDOCS](state, grantsDocs) {
        state.grantsDocs = grantsDocs;
    },
    [SET_HOSTELINFO](state, hostelInfo) {
        state.hostelInfo = hostelInfo;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
