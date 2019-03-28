import ApiService from "@/common/api.service";
import {
    FETCH_KCP_PAGES,
    FETCH_KCP_TYPES,
    FETCH_LIST_ENVIRONMENTS_PAGES,
    FETCH_ENVIRONMENT,
    NEW_ENVIRONMENT,
    DELETE_ENVIRONMENT,
    UPDATE_ENVIRONMENT
} from "./actions.type";
import {
    SET_KCP_PAGES,
    SET_KCP_TYPES,
    SET_LIST_ENVIRONMENTS_PAGES,
    SET_ENVIRONMENT
} from "./mutations.type";

export const state = {
    //known_content_pages
    kcpPages: [],
    listEnvironmentPages: [],
    environment: [],
    kcpTypes: []
};

const getters = {
    listEnvironmentPages(state) {
        return state.listEnvironmentPages;
    },
    environment(state) {
        return state.environment;
    },
    kcpPages(state) {
        return state.kcpPages;
    },
    kcpTypes(state) {
        return state.kcpTypes;
    }
};

export const actions = {
    [FETCH_KCP_PAGES](context) {
        ApiService.setHeader();
        return ApiService.get(`/admin/kcp_pages`).then(({ data }) => {
            context.commit(SET_KCP_PAGES, data);
            return data;
        });
    },
    [FETCH_KCP_TYPES](context) {
        ApiService.setHeader();
        return ApiService.get(`/admin/kcp_types`).then(({ data }) => {
            context.commit(SET_KCP_TYPES, data);
            return data;
        });
    },
    [FETCH_LIST_ENVIRONMENTS_PAGES](context) {
        ApiService.setHeader();
        return ApiService.get("admin/environment").then(({ data }) => {
            context.commit(SET_LIST_ENVIRONMENTS_PAGES, data);
            return data;
        });
    },
    [FETCH_ENVIRONMENT](context, id) {
        return ApiService.get(`environment/${id}`).then(({ data }) => {
            context.commit(SET_ENVIRONMENT, data);
            return data;
        });
    },
    [NEW_ENVIRONMENT](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/environment", params).then(function(response) {
            return response;
        });
    },
    [DELETE_ENVIRONMENT](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/environment", params);
    },
    [UPDATE_ENVIRONMENT](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/environment", params);
    }
};

export const mutations = {
    [SET_KCP_PAGES](state, kcpPages) {
        state.kcpPages = kcpPages;
    },
    [SET_KCP_TYPES](state, kcpTypes) {
        state.kcpTypes = kcpTypes;
    },
    [SET_LIST_ENVIRONMENTS_PAGES](state, listEnvironmentPages) {
        state.listEnvironmentPages = listEnvironmentPages;
    },
    [SET_ENVIRONMENT](state, environment) {
        state.environment = environment;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
