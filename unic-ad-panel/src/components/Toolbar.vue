<style>
.btn {
  min-width: 3.2em;
  font-size: 16px;
}

.btn .icon--right {
  margin-left: 0px;
}

.hidden-sm-and-down {
  margin-right: 5px;
}

.list__tile a {
  color: inherit;
  text-decoration-line: inherit;
}

.v-list__tile a {
  padding: 0;

  text-decoration-line: inherit;
}

.application--wrap {
  min-height: 0;
}

.toolbar .content {
  padding: 0;
}

.v-toolbar__content {
  padding-left: 0px;
}

.toolbar__items a {
  color: #ffffff;
}

.btn__content i {
  vertical-align: bottom;
}

.container {
  padding: 0;
}

@media only screen and (min-width: 1170px) {
  .hidden-sm-and-down {
    display: inline-block;
  }

  .toolbar__items {
    margin-right: 2em;
  }
}

@media only screen and (min-width: 570px) {
  .v-toolbar__title .hidden-sm-and-down {
    display: initial !important;
  }
}

@media only screen and (max-width: 1170px) {
  .hidden-sm-and-down {
    display: none !important;
  }

  .toolbar__items {
    margin-right: 2em;
  }
}

.footer {
  position: relative;
  width: 100%;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>

<template>
  <v-app v-if="isAuthenticated" id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      disable-resize-watcher
      app
      width="355"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i">
              <router-link class="v-list__tile" :to="child.link">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ child.text }}</v-list-tile-title>
                </v-list-tile-content>
              </router-link>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <router-link class="v-list__tile" :to="item.link">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down test">Колледж университета "Дубна"</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-for="(item, index) in toolbar" :key="index" class="toolbar__items">
        <router-link class="btn btn--flat btn--router" :to="item.link">
          <div class="btn__content">
            <span class="hidden-sm-and-down">{{ item.text }}</span>
            <i aria-hidden="true" class="icon icon--right material-icons">{{ item.icon }}</i>
          </div>
        </router-link>
      </div>
      <v-btn @click="logout" icon large>
        <v-icon title="Выход">exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid></v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.type";

export default {
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "home", text: "Главная", link: "/unic-ad-panel" },
      {
        icon: "account_balance",
        text: "Страницы",
        link: "/unic-ad-panel/pages"
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Сведения об образовательной организации",
        model: false,
        children: [
          { text: "Основные сведения", link: "/unic-ad-panel/sveden/common" },
          {
            text: "Структура и органы управления образовательной организацией",
            link: "/unic-ad-panel/sveden/struct"
          },
          {
            text: "Срок действия аккредитации",
            link: "/unic-ad-panel/sveden/eduAccred"
          },
          {
            text: "Образование",
            link: "/unic-ad-panel/sveden/education"
          },
          {
            text: "Численость обучающихся",
            link: "/unic-ad-panel/sveden/eduChislen"
          },
          {
            text: "Информация о приёме",
            link: "/unic-ad-panel/sveden/eduPriem"
          },
          {
            text: "Информация о переводе, восстановлении, отчислении",
            link: "/unic-ad-panel/sveden/eduPerevod"
          },
          {
            text: "Образовательные стандарты",
            link: "/unic-ad-panel/sveden/eduStandarts"
          },
          {
            text: "Руководство. Педагогический (научно-педагогический) состав",
            link: "/unic-ad-panel/sveden/employees"
          },
          {
            text: "Материально-техническое обеспечение (Кабинеты)",
            link: "/unic-ad-panel/sveden/cabinets"
          },
          {
            text: "Привязать кабинет к программе",
            link: "/unic-ad-panel/sveden/educabinets"
          },
          {
            text: "Сведения о наличии библиотек, объектов спорта",
            link: "/unic-ad-panel/sveden/purposelibr"
          },
          {
            text:
              "Сведения о доступе к электронной информационно-образовательной среде",
            link: "/unic-ad-panel/sveden/purposeeios"
          },
          {
            text: "Стипендии и иные виды материальной поддержки",
            link: "/unic-ad-panel/sveden/grants"
          },
          {
            text: "Локальные нормативные акты",
            link: "/unic-ad-panel/sveden/grantsdocs"
          },
          {
            text:
              "Наличие общежития, количество жилых помещений в общежитии для иногородних обучающихся",
            link: "/unic-ad-panel/sveden/hostelinfo"
          },
          {
            text: "Вакантные места для приема (перевода)",
            link: "/unic-ad-panel/sveden/vacant"
          }
        ]
      },
      {
        icon: "accessible",
        text: "Доступная среда",
        link: "/unic-ad-panel/environment"
      },
      {
        icon: "contacts",
        text: "Добавить новость",
        link: "/unic-ad-panel/addnews"
      },
      {
        icon: "add_to_photos",
        text: "Добавить фото к новостям",
        link: "/unic-ad-panel/addnewsfiles"
      },
      {
        icon: "add_a_photo",
        text: "Фотографии на главной",
        link: "/unic-ad-panel/gallery"
      },
      {
        icon: "cloud_upload",
        text: "Загрузить файлы",
        link: "/unic-ad-panel/fileupload"
      },
      {
        icon: "history",
        text: "История изменения страниц",
        link: "/unic-ad-panel/history"
      }
    ],
    toolbar: [{ icon: "home", text: "Главная", link: "/unic-ad-panel" }]
  }),
  props: {
    source: String
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "Login" });
      });
    }
  }
};
</script>