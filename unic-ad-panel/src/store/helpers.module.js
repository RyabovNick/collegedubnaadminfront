export const state = {
    successInsertMessage: "Данные успешно добавлены",
    successUpdateMessage: "Данные успешно изменены",
    successDeleteMessage: "Данные успешно удалены",
    errorInsertMessage: "Произошла ошибка при добавлении данных",
    errorUpdateMessage: "Произошла ошибка при изменении данных",
    errorDeleteMessage: "Произошла ошибка при удалении данных"
};

export const getters = {
    successInsertMessage(state) {
        return state.successInsertMessage;
    },
    successUpdateMessage(state) {
        return state.successUpdateMessage;
    },
    successDeleteMessage(state) {
        return state.successDeleteMessage;
    },
    errorInsertMessage(state) {
        return state.errorInsertMessage;
    },
    errorUpdateMessage(state) {
        return state.errorUpdateMessage;
    },
    errorDeleteMessage(state) {
        return state.errorDeleteMessage;
    }
};

export default {
    state,
    getters
};
