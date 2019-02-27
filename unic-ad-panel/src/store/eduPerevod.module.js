import ApiService from "@/common/api.service";
import {
    FETCH_EDUPEREVOD,
    NEW_EDUPEREVOD,
    DELETE_EDUPEREVOD,
    UPDATE_EDUPEREVOD
} from "./actions.type";
import { SET_EDUPEREVOD } from "./mutations.type";

export const state = {
    eduPerevod: []
};

const getters = {
    eduPerevod(state) {
        return state.eduPerevod;
    }
};

export const actions = {
    [FETCH_EDUPEREVOD](context) {
        ApiService.setHeader();
        return ApiService.get("admin/education/eduperevod").then(({ data }) => {
            context.commit(SET_EDUPEREVOD, data);
            return data;
        });
    },
    [NEW_EDUPEREVOD](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/education/eduperevod", params).then(function(responce) {
            return responce;
        });
    },
    [DELETE_EDUPEREVOD](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/education/eduperevod", params);
    },
    [UPDATE_EDUPEREVOD](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/education/eduperevod", params);
    }
};

export const mutations = {
    [SET_EDUPEREVOD](state, eduPerevod) {
        state.eduPerevod = eduPerevod;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
