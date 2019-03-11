import ApiService from "@/common/api.service";
import { FETCH_EDUSTANDARTS, UPLOAD_EDUSTANDARTS, DELETE_EDUSTANDARTS } from "./actions.type";
import { SET_EDUSTANDARTS } from "./mutations.type";

export const state = {
    eduStandarts: []
};

const getters = {
    eduStandarts(state) {
        return state.eduStandarts;
    }
};

export const actions = {
    [FETCH_EDUSTANDARTS](context) {
        return ApiService.get("eduStandarts").then(({ data }) => {
            context.commit(SET_EDUSTANDARTS, data);
            return data;
        });
    },
    [UPLOAD_EDUSTANDARTS](context, { file }) {
        ApiService.setHeader();
        return ApiService.upload(`admin/upload/edustandartdoc`, file).then(function(response) {
            return response;
        });
    },
    [DELETE_EDUSTANDARTS](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/eduStandarts", params);
    }
};

export const mutations = {
    [SET_EDUSTANDARTS](state, eduStandarts) {
        state.eduStandarts = eduStandarts;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
