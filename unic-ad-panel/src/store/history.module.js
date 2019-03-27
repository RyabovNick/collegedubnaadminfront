import ApiService from "@/common/api.service";
import { FETCH_HISTORY, FETCH_ONE_HISTORY } from "./actions.type";
import { SET_HISTORY, SET_ONE_HISTORY } from "./mutations.type";

export const state = {
    history: [],
    oneHistory: []
};

const getters = {
    history(state) {
        return state.history;
    },
    oneHistory(state) {
        return state.oneHistory;
    }
};

export const actions = {
    [FETCH_HISTORY](context) {
        ApiService.setHeader();
        return ApiService.get("admin/history").then(({ data }) => {
            context.commit(SET_HISTORY, data);
            return data;
        });
    },

    [FETCH_ONE_HISTORY](context, id) {
        ApiService.setHeader();
        return ApiService.get(`admin/history/${id}`).then(({ data }) => {
            context.commit(SET_ONE_HISTORY, data);
            return data;
        });
    }
};

export const mutations = {
    [SET_HISTORY](state, value) {
        state.history = value;
    },
    [SET_ONE_HISTORY](state, value) {
        state.oneHistory = value;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
