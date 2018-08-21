import ApiService from "@/common/api.service";
import { FETCH_COMMON } from "./actions.type";
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
        console.log(1);
        return ApiService.get("common").then(({ data }) => {
            console.log(data);
            context.commit(SET_COMMON, data);
            return data;
        });
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
