import ApiService from "@/common/api.service";
import { FETCH_EDUPRIEM, NEW_EDUPRIEM, DELETE_EDUPRIEM, UPDATE_EDUPRIEM } from "./actions.type";
import { SET_EDUPRIEM } from "./mutations.type";

export const state = {
    eduPriem: []
};

const getters = {
    eduPriem(state) {
        return state.eduPriem;
    }
};

export const actions = {
    [FETCH_EDUPRIEM](context) {
        ApiService.setHeader();
        return ApiService.get("admin/education/edupriem").then(({ data }) => {
            context.commit(SET_EDUPRIEM, data);
            return data;
        });
    },
    [NEW_EDUPRIEM](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/education/edupriem", params).then(function(response) {
            return response;
        });
    },
    [DELETE_EDUPRIEM](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/education/edupriem", params);
    },
    [UPDATE_EDUPRIEM](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/education/edupriem", params);
    }
};

export const mutations = {
    [SET_EDUPRIEM](state, eduPriem) {
        state.eduPriem = eduPriem;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
