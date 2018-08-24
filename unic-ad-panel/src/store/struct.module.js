import ApiService from "@/common/api.service";
import { FETCH_STRUCT, NEW_STRUCT, DELETE_STRUCT, UPDATE_STRUCT } from "./actions.type";
import { SET_STRUCT } from "./mutations.type";

export const state = {
    struct: []
};

const getters = {
    struct(state) {
        return state.struct;
    }
};

export const actions = {
    [FETCH_STRUCT](context) {
        return ApiService.get("heads").then(({ data }) => {
            context.commit(SET_STRUCT, data);
            return data;
        });
    },
    [NEW_STRUCT](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/heads", params).then(function(responce) {
            return responce;
        });
    },
    [DELETE_STRUCT](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/heads", params);
    },
    [UPDATE_STRUCT](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/heads", params);
    }
};

export const mutations = {
    [SET_STRUCT](state, struct) {
        state.struct = struct;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
