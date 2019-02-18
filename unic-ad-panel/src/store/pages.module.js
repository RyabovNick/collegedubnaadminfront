import ApiService from "@/common/api.service";
import { FETCH_PAGES, FETCH_PAGE, UPDATE_PAGE } from "./actions.type";
import { SET_PAGES, SET_PAGE } from "./mutations.type";

export const state = {
    pages: [],
    page: ""
};

const getters = {
    pages(state) {
        return state.pages;
    },
    page(state) {
        return state.page;
    }
};

export const actions = {
    [FETCH_PAGES](context) {
        ApiService.setHeader();
        return ApiService.get("admin/pages").then(({ data }) => {
            context.commit(SET_PAGES, data);
            return data;
        });
    },
    [FETCH_PAGE](context, id) {
        return ApiService.get(`pages/${id}`).then(({ data }) => {
            context.commit(SET_PAGE, data);
            return data;
        });
    },
    [UPDATE_PAGE](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/pages", params);
    }
};

export const mutations = {
    [SET_PAGES](state, pages) {
        state.pages = pages;
    },
    [SET_PAGE](state, page) {
        state.page = page[0].content;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
