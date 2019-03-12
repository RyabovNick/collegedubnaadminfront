import ApiService from "@/common/api.service";
import {
    FETCH_PURPOSELIBR,
    NEW_PURPOSELIBR,
    DELETE_PURPOSELIBR,
    UPDATE_PURPOSELIBR,
    FETCH_PURPOSEEIOS,
    NEW_PURPOSEEIOS,
    DELETE_PURPOSEEIOS,
    UPDATE_PURPOSEEIOS
} from "./actions.type";
import { SET_PURPOSELIBR, SET_PURPOSEEIOS } from "./mutations.type";

export const state = {
    purposeLibr: [],
    purposeEios: []
};

const getters = {
    purposeLibr(state) {
        return state.purposeLibr;
    },
    purposeEios(state) {
        return state.purposeEios;
    }
};

export const actions = {
    [FETCH_PURPOSELIBR](context) {
        return ApiService.get("purposelibr").then(({ data }) => {
            context.commit(SET_PURPOSELIBR, data);
            return data;
        });
    },
    [NEW_PURPOSELIBR](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/objects/purposelibr", params).then(function(responce) {
            return responce;
        });
    },
    [DELETE_PURPOSELIBR](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/objects/purposelibr", params);
    },
    [UPDATE_PURPOSELIBR](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/objects/purposelibr", params);
    },
    [FETCH_PURPOSEEIOS](context) {
        return ApiService.get("purposeeios").then(({ data }) => {
            context.commit(SET_PURPOSEEIOS, data);
            return data;
        });
    },
    [NEW_PURPOSEEIOS](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/objects/purposeeios", params).then(function(responce) {
            return responce;
        });
    },
    [DELETE_PURPOSEEIOS](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/objects/purposeeios", params);
    },
    [UPDATE_PURPOSEEIOS](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/objects/purposeeios", params);
    }
};

export const mutations = {
    [SET_PURPOSELIBR](state, purposeLibr) {
        state.purposeLibr = purposeLibr;
    },
    [SET_PURPOSEEIOS](state, purposeEios) {
        state.purposeEios = purposeEios;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
