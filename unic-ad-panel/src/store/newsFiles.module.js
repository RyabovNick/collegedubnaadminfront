import ApiService from "@/common/api.service";
import { FETCH_NEWS_PHOTO, UPLOAD_NEWS_PHOTO, DELETE_NEWS_PHOTO } from "./actions.type";
import { SET_NEWS_PHOTO } from "./mutations.type";

export const state = {
    photos: []
};

const getters = {
    photos(state) {
        return state.photos;
    }
};

export const actions = {
    [FETCH_NEWS_PHOTO](context) {
        ApiService.setHeader();
        return ApiService.get("admin/newsphoto").then(({ data }) => {
            context.commit(SET_NEWS_PHOTO, data);
            return data;
        });
    },

    [DELETE_NEWS_PHOTO](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/newsphoto", params);
    },
    [UPLOAD_NEWS_PHOTO](context, { id, file }) {
        console.log("vuex_file: ", file);
        ApiService.setHeader();
        return ApiService.upload(`admin/upload_news/photo/${id}`, file).then(function(response) {
            return response;
        });
    }
};

export const mutations = {
    [SET_NEWS_PHOTO](state, photos) {
        state.photos = photos;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
