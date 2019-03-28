import ApiService from "@/common/api.service";
import { FETCH_COMMON, NEW_COMMON, DELETE_COMMON, UPDATE_COMMON } from "./actions.type";
import { SET_COMMON } from "./mutations.type";

export const state = {
    common: []
};

const getters = {
    common(state) {
        return state.common;
    }
};

export const actions = {
    [FETCH_COMMON](context) {
        return ApiService.get("common").then(({ data }) => {
            context.commit(SET_COMMON, data);
            return data;
        });
    },
    [NEW_COMMON](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/common", params).then(function(response) {
            return response;
        });
    },
    [DELETE_COMMON](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/common", params);
    },
    [UPDATE_COMMON](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/common", params);
    }
};

export const mutations = {
    [SET_COMMON](state, common) {
        state.common = common;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
