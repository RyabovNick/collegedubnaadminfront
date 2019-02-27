import ApiService from "@/common/api.service";
import {
    FETCH_EDUCHISLEN,
    NEW_EDUCHISLEN,
    DELETE_EDUCHISLEN,
    UPDATE_EDUCHISLEN
} from "./actions.type";
import { SET_EDUCHISLEN } from "./mutations.type";

export const state = {
    eduChislen: []
};

const getters = {
    eduChislen(state) {
        return state.eduChislen;
    }
};

export const actions = {
    [FETCH_EDUCHISLEN](context) {
        ApiService.setHeader();
        return ApiService.get("admin/education/educhislen").then(({ data }) => {
            context.commit(SET_EDUCHISLEN, data);
            return data;
        });
    },
    [NEW_EDUCHISLEN](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/education/educhislen", params).then(function(responce) {
            return responce;
        });
    },
    [DELETE_EDUCHISLEN](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/education/educhislen", params);
    },
    [UPDATE_EDUCHISLEN](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/education/educhislen", params);
    }
};

export const mutations = {
    [SET_EDUCHISLEN](state, eduChislen) {
        state.eduChislen = eduChislen;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
