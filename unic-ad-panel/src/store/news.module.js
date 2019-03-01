import ApiService from "@/common/api.service";
import {
    FETCH_LIST_NEWS,
    FETCH_NEWS,
    NEW_NEWS,
    DELETE_NEWS,
    UPDATE_NEWS,
    UPLOAD_NEWS
} from "./actions.type";
import { SET_LIST_NEWS, SET_NEWS, CHANGE_LIST_NEWS } from "./mutations.type";

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

    [FETCH_NEWS](context, id) {
        return ApiService.get(`news/${id}`).then(({ data }) => {
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
        return ApiService.delete("admin/news", params).then(() => {
            context.commit(CHANGE_LIST_NEWS, params);
        });
    },
    [UPDATE_NEWS](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/news", params);
    },
    [UPLOAD_NEWS](context, { file }) {
        ApiService.setHeader();
        return ApiService.upload(`admin/upload_news`, file).then(function(response) {
            return response;
        });
    }
};

export const mutations = {
    [SET_LIST_NEWS](state, news) {
        state.listNews = news;
    },
    [SET_NEWS](state, news) {
        state.news = news;
    },
    [CHANGE_LIST_NEWS](state, news) {
        let removeIndex = state.listNews
            .map(item => {
                return item.id;
            })
            .indexOf(news.id);
        removeIndex >= 0 && state.listNews.splice(removeIndex, 1);
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
