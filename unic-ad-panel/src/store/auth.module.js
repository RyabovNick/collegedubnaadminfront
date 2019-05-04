import ApiService from '@/common/api.service';
import JwtService from '@/common/jwt.service';
import { LOGIN, LOGOUT, CHECK_AUTH } from './actions.type';
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';

const state = {
    errors: null,
    user: {},
    isAuthenticated: false,
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
};

const actions = {
    [LOGIN](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post('user/login', { user: credentials })
                .then(({ data }) => {
                    context.commit(SET_AUTH, data.user);
                    JwtService.saveToken(data.user.token);
                    resolve(data);
                })
                .catch(error => {
                    console.log('response: ', error);
                    context.commit(SET_ERROR, error);
                    reject(error);
                });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    [CHECK_AUTH](context) {
        return new Promise((resolve, reject) => {
            if (JwtService.getToken()) {
                ApiService.setHeader();
                ApiService.get('user')
                    .then(({ data }) => {
                        context.commit(SET_AUTH, data.user);
                        resolve(data);
                    })
                    .catch(error => {
                        context.commit(SET_ERROR, error);
                        reject(error);
                    });
            } else {
                context.commit(PURGE_AUTH);
                reject(new Error('Token does not exist'));
            }
        });
    },
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, user) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        JwtService.saveToken(state.user.token);
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        JwtService.destroyToken();
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
};
