import ApiService from "@/common/api.service";
import {
    FETCH_CABINETS,
    NEW_CABINETS,
    DELETE_CABINETS,
    UPDATE_CABINETS,
    FETCH_EDUCABINETS,
    NEW_EDUCABINETS,
    DELETE_EDUCABINETS,
    UPDATE_EDUCABINETS
} from "./actions.type";
import { SET_CABINETS, SET_EDUCABINETS } from "./mutations.type";

export const state = {
    cabinets: [],
    eduCabinets: []
};

const getters = {
    cabinets(state) {
        return state.cabinets;
    },
    eduCabinets(state) {
        return state.eduCabinets;
    }
};

export const actions = {
    [FETCH_CABINETS](context) {
        ApiService.setHeader();
        return ApiService.get("admin/objects/cabinets").then(({ data }) => {
            context.commit(SET_CABINETS, data);
            return data;
        });
    },
    [NEW_CABINETS](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/objects/cabinets", params).then(function(responce) {
            return responce;
        });
    },
    [DELETE_CABINETS](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/objects/cabinets", params);
    },
    [UPDATE_CABINETS](context, params) {
        console.log("its update " + params);
        ApiService.setHeader();
        return ApiService.put("admin/objects/cabinets", params);
    },
    [FETCH_EDUCABINETS](context) {
        ApiService.setHeader();
        return ApiService.get("admin/objects/educabs").then(({ data }) => {
            context.commit(SET_EDUCABINETS, data);
            return data;
        });
    },
    [NEW_EDUCABINETS](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/objects/educabs", params).then(function(responce) {
            return responce;
        });
    },
    [DELETE_EDUCABINETS](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/objects/educabs", params);
    },
    [UPDATE_EDUCABINETS](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/objects/educabs", params);
    }
};

export const mutations = {
    [SET_CABINETS](state, cabinets) {
        state.cabinets = cabinets;
    },
    [SET_EDUCABINETS](state, eduCabinets) {
        state.eduCabinets = eduCabinets;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
