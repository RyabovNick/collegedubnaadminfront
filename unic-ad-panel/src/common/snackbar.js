/**
 * Изменение состояния snackbar используется
 * почти в каждом компоненте
 * для удобства использования можно импортировать
 * этот mixin в нужный компонент
 *
 * import snackbar from "@/common/snackbar.js";
 *
 * подключить его
 *
 * mixins: [snackbar]
 *
 * И использовать:
 *
 * this.runSnackbar("success", this.successUpdateMessage);
 *
 * Сообщения хранятся в vuex - helpers.
 */
export default {
    methods: {
        /**
         * Параметр, отвечающий за запуск должен называться snackbar
         * @param {string} color - необходимо именно так назвать
         * параметр в data, отвечающий за цвет
         * @param {string} text - необходимо именно так назвать
         * параметр в data, отвечающий за сообщение
         */
        runSnackbar(color, text) {
            this.color = color;
            this.text = text;
            this.snackbar = true;
        }
    }
};
