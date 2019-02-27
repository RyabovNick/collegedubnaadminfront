import ApiService from "@/common/api.service";
import { FETCH_EDUACCRED, NEW_EDUACCRED, DELETE_EDUACCRED, UPDATE_EDUACCRED } from "./actions.type";
import { SET_EDUACCRED } from "./mutations.type";

export const state = {
    eduAccred: []
};

const getters = {
    eduAccred(state) {
        return state.eduAccred;
    }
};

export const actions = {
    [FETCH_EDUACCRED](context) {
        return ApiService.get("eduaccred").then(({ data }) => {
            context.commit(SET_EDUACCRED, data);
            return data;
        });
    },
    [NEW_EDUACCRED](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/education/eduaccred", params).then(function(responce) {
            return responce;
        });
    },
    [DELETE_EDUACCRED](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/education/eduaccred", params);
    },
    [UPDATE_EDUACCRED](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/education/eduaccred", params);
    }
};

export const mutations = {
    [SET_EDUACCRED](state, eduAccred) {
        state.eduAccred = eduAccred;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
