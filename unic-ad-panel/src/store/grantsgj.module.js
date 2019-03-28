import ApiService from "@/common/api.service";
import { FETCH_GRANTSGJ, NEW_GRANTSGJ, DELETE_GRANTSGJ, UPDATE_GRANTSGJ } from "./actions.type";
import { SET_GRANTSGJ } from "./mutations.type";

export const state = {
    graduateJob: []
};

const getters = {
    graduateJob(state) {
        return state.graduateJob;
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
    }
};

export const mutations = {
    [SET_GRANTSGJ](state, graduateJob) {
        state.graduateJob = graduateJob;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
