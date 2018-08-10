/**
 * Methods to work with token
 * ID_TOKEN_KEY is a token name
 */
const ID_TOKEN_KEY = "college.uni-dubna.ru_token";

/**
 * We got 3 methods to work with token: Get, Save, Destoy
 */
export default {
    getToken() {
        return window.localStorage.getItem(ID_TOKEN_KEY);
    },

    saveToken(token) {
        window.localStorage.setItem(ID_TOKEN_KEY, token);
    },

    destroyToken() {
        window.localStorage.removeItem(ID_TOKEN_KEY);
    }
};
