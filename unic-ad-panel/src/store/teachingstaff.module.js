import ApiService from "@/common/api.service";
import {
    FETCH_TEACHINGSTAFF,
    NEW_TEACHINGSTAFF,
    DELETE_TEACHINGSTAFF,
    UPDATE_TEACHINGSTAFF
} from "./actions.type";
import { SET_TEACHINGSTAFF } from "./mutations.type";

export const state = {
    teachingStaff: []
};

const getters = {
    teachingStaff(state) {
        return state.teachingStaff;
    }
};

export const actions = {
    [FETCH_TEACHINGSTAFF](context) {
        return ApiService.get("teachingStaff").then(({ data }) => {
            context.commit(SET_TEACHINGSTAFF, data);
            return data;
        });
    },
    [NEW_TEACHINGSTAFF](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/teachingStaff", params).then(function(responce) {
            return responce;
        });
    },
    [DELETE_TEACHINGSTAFF](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/teachingStaff", params);
    },
    [UPDATE_TEACHINGSTAFF](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/teachingStaff", params);
    }
};

export const mutations = {
    [SET_TEACHINGSTAFF](state, teachingStaff) {
        state.teachingStaff = teachingStaff;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
