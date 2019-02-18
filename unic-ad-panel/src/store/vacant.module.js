import ApiService from "@/common/api.service";
import { FETCH_VACANT, NEW_VACANT, DELETE_VACANT, UPDATE_VACANT } from "./actions.type";
import { SET_VACANT } from "./mutations.type";

export const state = {
    vacant: []
};

const getters = {
    vacant(state) {
        return state.vacant;
    }
};

export const actions = {
    [FETCH_VACANT](context) {
        return ApiService.get("vacant").then(({ data }) => {
            context.commit(SET_VACANT, data);
            return data;
        });
    },
    [NEW_VACANT](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/vacant", params).then(function(response) {
            return response;
        });
    },
    [DELETE_VACANT](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/vacant", params);
    },
    [UPDATE_VACANT](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/vacant", params);
    }
};

export const mutations = {
    [SET_VACANT](state, vacant) {
        state.vacant = vacant;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
