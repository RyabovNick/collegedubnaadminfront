import ApiService from "@/common/api.service";
import { FETCH_LIST_NEWS, FETCH_NEWS, NEW_NEWS, DELETE_NEWS, UPDATE_NEWS } from "./actions.type";
import { SET_LIST_NEWS, SET_NEWS } from "./mutations.type";

export const state = {
    listNews: [],
    news: []
};

const getters = {
    listNews(state) {
        return state.listNews;
    },
    news(state) {
        return state.news;
    }
};

export const actions = {
    [FETCH_LIST_NEWS](context) {
        ApiService.setHeader();
        return ApiService.get("admin/listnews").then(({ data }) => {
            context.commit(SET_LIST_NEWS, data);
            return data;
        });
    },

    [FETCH_NEWS](context) {
        return ApiService.get("news").then(({ data }) => {
            context.commit(SET_NEWS, data);
            return data;
        });
    },
    [NEW_NEWS](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/upload/news", params).then(function(responce) {
            return responce;
        });
    },
    [DELETE_NEWS](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/news", params);
    },
    [UPDATE_NEWS](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/news", params);
    }
};

export const mutations = {
    [SET_LIST_NEWS](state, news) {
        state.listNews = news;
    },

    [SET_NEWS](state, news) {
        state.news = news;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
