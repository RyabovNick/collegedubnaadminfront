<template>
  <div class="home">
    <vue-markdown class="md-helper" show :source="newsText"></vue-markdown>
  </div>
</template>

<script>
// @ is an alias to /src
import VueMarkdown from "vue-markdown";

export default {
  name: "Home",
  components: {
    VueMarkdown
  },
  data() {
    return {
      newsText:
        "# Добавление новостей\n" +
        "Используется формат markdown https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet https://ru.wikipedia.org/wiki/Markdown \n" +
        "Загружать фото для новостей можно в разделе 'Добавить фото к новостям'. Там же можно и удалить. \n" +
        "# Кабинеты \n" +
        "Необходимо добавить нужную образовательную программу в разделе 'Срок действия аккредитации'. " +
        "Затем создать кабинет в разделе 'Материально-техническое обеспечение (Кабинеты)'. " +
        "После этого можно привязать кабинет в программе в соответствующем разделе. \n" +
        "# Образование \n" +
        "Добавление образовательных программ в разделе 'Срок действия аккредитации'. " +
        "Загрузка файлов в разделе 'Образование'. Нужно выбрать программу и тип документа. \n" +
        "# Страницы \n" +
        "Изменять содержимое страниц можно в соответствующем разделе." +
        " Как и для новостей, используется формат markdown. \n" +
        "" +
        "" +
        "" +
        ""
    };
  }
};
</script>

<style scoped>
.md-helper >>> h1 {
  font-size: 2em;
  text-align: center;
}

.md-helper >>> h2 {
  font-size: 1.7em;
  text-align: center;
  padding-bottom: 1em;
  padding-top: 1em;
}

.md-helper >>> h3 {
  font-size: 1.4em;
  text-align: center;
  padding-bottom: 0.8em;
  padding-top: 0.8em;
}

.md-helper >>> h4 {
  font-size: 1em;
  text-align: center;
  padding-bottom: 0.5em;
  padding-top: 0.5em;
}

.md-helper >>> h5 {
  font-size: 1.25em;
  text-align: left;
}

.md-helper >>> p {
  font-size: 16px;
  text-align: left;
  line-height: 1.5;
  margin-bottom: 0;
  text-indent: 35px;
}

.md-helper >>> table {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  border-collapse: collapse;
  max-width: 100%;
  overflow-x: auto;
  display: block;
}

.md-helper >>> th {
  border: 1px solid grey;
  border-collapse: collapse;
  padding: 5px;
  font-size: 16px;
}

.md-helper >>> td {
  border: 1px solid grey;
  border-collapse: collapse;
  padding: 5px;
  font-size: 16px;
}

.md-helper >>> hr {
  margin-top: 10px;
  margin-bottom: 10px;
}

.md-helper >>> img {
  width: 80%;
  display: block;
  margin: auto;
}

.md-helper >>> ol,
ul {
  text-align: left;
  padding-left: 70px;
}

.md-helper >>> li {
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
}

.md-helper >>> iframe {
  width: 100%;
  max-width: 560px;
}

.md-helper >>> .yandexmap {
  max-width: inherit;
}

.md-helper >>> code {
  width: 90%;
  text-align: left;
}
</style>
