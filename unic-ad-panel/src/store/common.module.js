import { CommonService } from "@/common/api.service";
import { FETCH_COMMON } from "./actions.type";
import { SET_COMMON } from "./mutations.type";

export const state = {
    common: []
};

export const actions = {
    [FETCH_COMMON](context, commonSlug) {
        return CommonService.get(commonSlug).then(({ data }) => {
            context.commit(SET_COMMON, data.common);
            return data;
        });
    }
};

export const mutations = {
    [SET_COMMON](state, common) {
        state.common = common;
    }
};

const getters = {
    common(state) {
        return state.common;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
