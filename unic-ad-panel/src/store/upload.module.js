import ApiService from "@/common/api.service";
import {
    FETCH_PATHS,
    FETCH_FILES,
    NEW_PATHS,
    DELETE_PATHS,
    UPDATE_PATHS,
    UPLOAD_FILES,
    DELETE_FILE
} from "./actions.type";
import { SET_PATHS, SET_FILES } from "./mutations.type";

export const state = {
    paths: [],
    files: []
};

const getters = {
    paths(state) {
        return state.paths;
    },
    files(state) {
        return state.files;
    }
};

export const actions = {
    [FETCH_FILES](context) {
        ApiService.setHeader();
        return ApiService.get("admin/files").then(({ data }) => {
            context.commit(SET_FILES, data);
            return data;
        });
    },
    // параметр id не используется, но лень писать другой helper
    [DELETE_FILE](context, { id }) {
        ApiService.setHeader();
        return ApiService.delete(`admin/upload_files/${id}`, id).catch(err => {
            console.log("err: ", err);
        });
    },
    [FETCH_PATHS](context) {
        ApiService.setHeader();
        return ApiService.get("admin/paths").then(({ data }) => {
            context.commit(SET_PATHS, data);
            return data;
        });
    },
    [NEW_PATHS](context, params) {
        ApiService.setHeader();
        return ApiService.post("admin/paths", params).then(function(response) {
            return response;
        });
    },
    [DELETE_PATHS](context, params) {
        ApiService.setHeader();
        return ApiService.delete("admin/paths", params);
    },
    [UPDATE_PATHS](context, params) {
        ApiService.setHeader();
        return ApiService.put("admin/paths", params);
    },
    [UPLOAD_FILES](context, { path, file }) {
        ApiService.setHeader();
        return ApiService.upload(`admin/upload_files/${path}`, file).then(function(response) {
            return response;
        });
    }
};

export const mutations = {
    [SET_PATHS](state, paths) {
        state.paths = paths;
    },
    [SET_FILES](state, files) {
        state.files = files;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
