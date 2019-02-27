import ApiService from "@/common/api.service";
import { FETCH_EDUCATION, UPLOAD_EDUCATION } from "./actions.type";
import { SET_EDUCATION } from "./mutations.type";

export const state = {
    education: []
};

const getters = {
    education(state) {
        return state.education;
    }
};

export const actions = {
    [FETCH_EDUCATION](context) {
        return ApiService.get("eduop").then(({ data }) => {
            context.commit(SET_EDUCATION, data);
            return data;
        });
    },
    // [NEW_EDUCATION](context, params) {
    //     ApiService.setHeader();
    //     return ApiService.post("admin/education/eduaccred", params).then(function(responce) {
    //         return responce;
    //     });
    // },
    // [DELETE_EDUCATION](context, params) {
    //     ApiService.setHeader();
    //     return ApiService.delete("admin/education/eduaccred", params);
    // },
    // [UPDATE_EDUCATION](context, params) {
    //     ApiService.setHeader();
    //     return ApiService.put("admin/education/eduaccred", params);
    // }
    [UPLOAD_EDUCATION](context) {}
};

export const mutations = {
    [SET_EDUCATION](state, education) {
        state.education = education;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
