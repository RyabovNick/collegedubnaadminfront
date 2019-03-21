import ApiService from "@/common/api.service";
import { FETCH_GALLERY, UPLOAD_GALLERY, DELETE_GALLERY } from "./actions.type";
import { SET_GALLERY } from "./mutations.type";

export const state = {
    gallery: []
};

const getters = {
    gallery(state) {
        return state.gallery;
    }
};

export const actions = {
    [FETCH_GALLERY](context) {
        ApiService.setHeader();
        return ApiService.get("gallery").then(({ data }) => {
            context.commit(SET_GALLERY, data);
            return data;
        });
    },
    [DELETE_GALLERY](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/gallery", params);
    },
    [UPLOAD_GALLERY](context, { file }) {
        ApiService.setHeader();
        return ApiService.upload(`admin/gallery`, file).then(function(response) {
            return response;
        });
    }
};

export const mutations = {
    [SET_GALLERY](state, gallery) {
        state.gallery = gallery;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
