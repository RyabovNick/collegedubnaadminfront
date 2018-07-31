<style scoped>
table.v-table {
  width: auto;
  margin: auto;
  max-width: 100%;
}

.v-input__slot {
  max-width: max-content;
  margin: auto;
}

.v-card .v-card__title .v-input {
  max-width: 500px;
  margin: auto;
}

h2 {
  text-align: center;
}
</style>

<style>
.icon-size {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

table.v-table thead th {
  white-space: initial;
}
</style>



<template>
    <v-app>
        <h1>Образование</h1>
        <h2>Информация по образовательным программам</h2>
        <section v-if="errored_eduop">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading_eduop">Загрузка...</div>
            <v-card>
            <v-card-title>
                <v-text-field
                    v-model="searchEduop"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headersEduop"
            :items="eduop"
            expand
            hide-actions
            :search="searchEduop"
            class="elevation-2"
        >
            <template slot="items" slot-scope="props">
                <td itemprop="eduCode" class="text-xs-left">{{ props.item.eduCode }}</td>
                <td itemprop="eduName" class="text-xs-right">{{ props.item.eduName }}</td>
                <td itemprop="eduLevel" class="text-xs-right">{{ props.item.eduLevel }}</td>
                <td itemprop="eduForm" class="text-xs-right">{{ props.item.eduForm }}</td>
                <td itemprop="eduYear" class="text-xs-right">{{ props.item.year }}</td>
                <td itemprop="opMain" class="text-xs-center">
                  <a :href="`/files/${props.item.opMain}`" target="_blank">
                    <img class="icon-size" src="@/assets/icons/open.svg" alt="Открыть" title="Открыть в новом окне">
                  </a>
                  <a :href="`/files/${props.item.opMain}`" download="" target="_self">
                    <img class="icon-size" src="@/assets/icons/download.svg" alt="Скачать" title="Скачать">
                  </a>
                </td>
                <td itemprop="educationPlan" class="text-xs-center">
                  <a :href="`/files/${props.item.educationPlan}`" target="_blank">
                    <img class="icon-size" src="@/assets/icons/open.svg" alt="Открыть" title="Открыть в новом окне">
                  </a>
                  <a :href="`/files/${props.item.educationPlan}`" download="" target="_self">
                    <img class="icon-size" src="@/assets/icons/download.svg" alt="Скачать" title="Скачать">
                  </a>
                </td>
                <td itemprop="educationAnnotation" class="text-xs-center">
                  <a :href="`/files/${props.item.educationAnnotation}`" target="_blank">
                    <img class="icon-size" src="@/assets/icons/open.svg" alt="Открыть" title="Открыть в новом окне">
                  </a>
                  <a :href="`/files/${props.item.educationAnnotation}`" download="" target="_self">
                    <img class="icon-size" src="@/assets/icons/download.svg" alt="Скачать" title="Скачать">
                  </a>
                </td>
                <td itemprop="educationShedule" class="text-xs-center">
                  <a :href="`/files/${props.item.educationShedule}`" target="_blank">
                    <img class="icon-size" src="@/assets/icons/open.svg" alt="Открыть" title="Открыть в новом окне">
                  </a>
                  <a :href="`/files/${props.item.educationShedule}`" download="" target="_self">
                    <img class="icon-size" src="@/assets/icons/download.svg" alt="Скачать" title="Скачать">
                  </a>
                  </td>
                <td itemprop="methodologyedu" class="text-xs-center">
                  <a :href="`/files/${props.item.methodology}`" target="_blank">
                    <img class="icon-size" src="@/assets/icons/open.svg" alt="Открыть" title="Открыть в новом окне">
                  </a>
                  <a :href="`/files/${props.item.methodology}`" download="" target="_self">
                    <img class="icon-size" src="@/assets/icons/download.svg" alt="Скачать" title="Скачать">
                  </a>
                  </td>
                <td itemprop="eduPr" class="text-xs-right">{{ props.item.eduPr }}</td>
            </template>
            </v-data-table>
            </v-card>
        </section>
        <br/>
        <h2>Информация о сроке действия государственной аккредитации образовательной программы, о языках, на которых осуществляется образование (обучение)</h2>
        <section v-if="errored_eduaccred">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading_eduaccred">Загрузка...</div>
            <v-card>
            <v-card-title>
                <v-text-field
                    v-model="searchEduaccred"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headersEduaccred"
            :items="eduaccred"
            expand
            hide-actions
            :search="searchEduaccred"
            class="elevation-2"
        >
            <template slot="items" slot-scope="props">
                <td itemprop="eduCode" class="text-xs-left">{{ props.item.eduCode }}</td>
                <td itemprop="eduName" class="text-xs-right">{{ props.item.eduName }}</td>
                <td itemprop="eduLevel" class="text-xs-right">{{ props.item.eduLevel }}</td>
                <td itemprop="learningTerm" class="text-xs-right">{{ props.item.learningTerm }}</td>
                <td itemprop="eduAccred" class="text-xs-right">{{ props.item.dateEnd }}</td>
                <td itemprop="eduLang" class="text-xs-right">{{ props.item.language }}</td>
            </template>
            </v-data-table>
            </v-card>
        </section>
        <br/>
        <h2>Информация о численности обучающихся по реализуемым образовательным программам</h2>
        <section v-if="errored_chislen">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading_chislen">Загрузка...</div>
            <v-card>
            <v-card-title>
                <v-text-field
                    v-model="searchChislen"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headersChislen"
            :items="chislen"
            expand
            hide-actions
            :search="searchChislen"
            class="elevation-2"
        >
            <template slot="items" slot-scope="props">
                <td itemprop="eduCode" class="text-xs-left">{{ props.item.eduCode }}</td>
                <td itemprop="eduName" class="text-xs-right">{{ props.item.eduName }}</td>
                <td itemprop="eduLevel" class="text-xs-right">{{ props.item.eduLevel }}</td>
                <td itemprop="eduForm" class="text-xs-right">{{ props.item.eduForm }}</td>
                <td itemprop="numberBFpriem" class="text-xs-right">{{ props.item.numberBFpriem }}</td>
                <td itemprop="numberBRpriem" class="text-xs-right">{{ props.item.numberBRpriem }}</td>
                <td itemprop="numberBMpriem" class="text-xs-right">{{ props.item.numberBMpriem }}</td>
                <td itemprop="numberPpriem" class="text-xs-right">{{ props.item.numberPpriem }}</td>
                
            </template>
            </v-data-table>
            </v-card>
        </section>
        <br/>
        <h2>Информация о результатах приема</h2>
        <section v-if="errored_priem">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading_priem">Загрузка...</div>
            <v-card>
            <v-card-title>
                <v-text-field
                    v-model="searchPriem"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headersPriem"
            :items="priem"
            expand
            hide-actions
            :search="searchPriem"
            class="elevation-2"
        >
            <template slot="items" slot-scope="props">
                <td itemprop="eduCode" class="text-xs-left">{{ props.item.eduCode }}</td>
                <td itemprop="eduName" class="text-xs-right">{{ props.item.eduName }}</td>
                <td itemprop="eduLevel" class="text-xs-right">{{ props.item.eduLevel }}</td>
                <td itemprop="eduForm" class="text-xs-right">{{ props.item.eduForm }}</td>
                <td itemprop="numberBFpriem" class="text-xs-right">{{ props.item.numberBFpriem }}</td>
                <td itemprop="numberBRpriem" class="text-xs-right">{{ props.item.numberBRpriem }}</td>
                <td itemprop="numberBMpriem" class="text-xs-right">{{ props.item.numberBMpriem }}</td>
                <td itemprop="numberPpriem" class="text-xs-right">{{ props.item.numberPpriem }}</td>
                
            </template>
            </v-data-table>
            </v-card>
        </section>
        <br/>
        <h2>Информация о результатах перевода, восстановления и отчисления</h2>
        <section v-if="errored_perevod">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>
        <section v-else>
            <div v-if="loading_perevod">Загрузка...</div>
            <v-card>
            <v-card-title>
                <v-text-field
                    v-model="searchPerevod"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headersPerevod"
            :items="perevod"
            expand
            hide-actions
            :search="searchPerevod"
            class="elevation-2"
        >
            <template slot="items" slot-scope="props">
                <td itemprop="eduCode" class="text-xs-left">{{ props.item.eduCode }}</td>
                <td itemprop="eduName" class="text-xs-right">{{ props.item.eduName }}</td>
                <td itemprop="eduLevel" class="text-xs-right">{{ props.item.eduLevel }}</td>
                <td itemprop="eduForm" class="text-xs-right">{{ props.item.eduForm }}</td>
                <td itemprop="numberOutPerevod" class="text-xs-right">{{ props.item.numberOutPerevod }}</td>
                <td itemprop="numberToPerevod" class="text-xs-right">{{ props.item.numberToPerevod }}</td>
                <td itemprop="numberResPerevod" class="text-xs-right">{{ props.item.numberResPerevod }}</td>
                <td itemprop="numberExpPerevod" class="text-xs-right">{{ props.item.numberExpPerevod }}</td>
                
            </template>
            </v-data-table>
            </v-card>
        </section>
    </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchEduop: "",
      headersEduop: [
        { text: "Код", align: "left", sortable: false, value: "eduCode" },
        {
          text: "Наименование специальности, направления подготовки",
          sortable: false,
          value: "eduName"
        },
        { text: "Уровень образования", sortable: false, value: "eduLevel" },
        {
          text: "Реализуемые формы обучения",
          sortable: false,
          value: "eduForm"
        },
        { text: "Год", sortable: false, value: "year" },
        {
          text: "Описание образовательной программы",
          sortable: false,
          value: "opMain"
        },
        { text: "Учебный план", sortable: false, value: "educationPlan" },
        {
          text: "Аннотации к рабочим программам дисциплин",
          sortable: false,
          value: "educationAnnotation"
        },
        {
          text: "Календарный учебный график",
          sortable: false,
          value: "educationShedule"
        },
        {
          text: "Методические и иные документы",
          sortable: false,
          value: "methodology"
        },
        {
          text:
            "Использование при реализации образовательных программ электронного обучения и дистанционных образовательных технологий",
          sortable: false,
          value: "eduPr"
        }
      ],
      searchEduaccred: "",
      headersEduaccred: [
        {
          text: "Код программы",
          align: "left",
          sortable: false,
          value: "eduCode"
        },
        { text: "Название программы", sortable: false, value: "eduName" },
        {
          text: "Уровень образования",
          sortable: false,
          value: "eduLevel"
        },
        {
          text: "Информация о нормативных сроках обучения",
          sortable: false,
          value: "learningTerm"
        },
        {
          text: "Срок действия государственной аккредитации",
          sortable: false,
          value: "dateEnd"
        },
        {
          text: "Языки, на которых осуществляется обучение",
          sortable: false,
          value: "language"
        }
      ],
      searchChislen: "",
      headersChislen: [
        {
          text: "Код программы",
          align: "left",
          sortable: false,
          value: "eduCode"
        },
        {
          text: "Наименование специальности",
          sortable: false,
          value: "eduName"
        },
        {
          text: "Уровень образования",
          sortable: false,
          value: "eduLevel"
        },
        {
          text: "Форма обучения",
          sortable: false,
          value: "eduForm"
        },
        {
          text:
            "Численность обучающихся за счёт бюджетных ассигнований федерального бюджета",
          sortable: false,
          value: "numberBFpriem"
        },
        {
          text:
            "Численность обучающихся за счёт бюджетов субъектов Российской Федерации",
          sortable: false,
          value: "numberBRpriem"
        },
        {
          text: "Численность обучающихся за счёт местных бюджетов",
          sortable: false,
          value: "numberBMpriem"
        },
        {
          text:
            "Численность обучающихся за счёт средств физических и (или) юридических лиц",
          sortable: false,
          value: "numberPpriem"
        }
      ],
      searchPriem: "",
      headersPriem: [
        {
          text: "Код программы",
          align: "left",
          sortable: false,
          value: "eduCode"
        },
        {
          text: "Наименование специальности",
          sortable: false,
          value: "eduName"
        },
        {
          text: "Уровень образования",
          sortable: false,
          value: "eduLevel"
        },
        {
          text: "Форма обучения",
          sortable: false,
          value: "eduForm"
        },
        {
          text:
            "Результаты приема за счёт бюджетных ассигнований федерального бюджета",
          sortable: false,
          value: "numberBFpriem"
        },
        {
          text:
            "Результаты приема за счёт бюджетов субъектов Российской Федерации",
          sortable: false,
          value: "numberBRpriem"
        },
        {
          text: "Результаты приема за счёт местных бюджетов",
          sortable: false,
          value: "numberBMpriem"
        },
        {
          text:
            "Результаты приема за счёт средств физических и (или) юридических лиц",
          sortable: false,
          value: "numberPpriem"
        }
      ],
      searchPerevod: "",
      headersPerevod: [
        {
          text: "Код программы",
          align: "left",
          sortable: false,
          value: "eduCode"
        },
        {
          text: "Наименование специальности",
          sortable: false,
          value: "eduName"
        },
        {
          text: "Уровень образования",
          sortable: false,
          value: "eduLevel"
        },
        {
          text: "Форма обучения",
          sortable: false,
          value: "eduForm"
        },
        {
          text:
            "Численность обучающихся, переведенных в другие образовательные организации",
          sortable: false,
          value: "numberOutPerevod"
        },
        {
          text:
            "Численность обучающихся, переведенных из других образовательных организаций",
          sortable: false,
          value: "numberToPerevod"
        },
        {
          text: "Численность восстановленных обучающихся",
          sortable: false,
          value: "numberResPerevod"
        },
        {
          text: "Численность отчисленных обучающихся",
          sortable: false,
          value: "numberExpPerevod"
        }
      ],
      priem: [],
      eduaccred: [],
      perevod: [],
      eduop: [],
      chislen: [],
      loading_priem: true,
      errored_priem: false,
      loading_eduaccred: true,
      errored_eduaccred: false,
      loading_perevod: true,
      errored_perevod: false,
      loading_eduop: true,
      errored_eduop: false,
      loading_chislen: true,
      errored_chislen: false
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/priem")
      .then(response => (this.priem = response.data))
      .catch(error => {
        console.log(error);
        this.errored_priem = true;
      })
      .finally(() => (this.loading_priem = false));
    axios
      .get("http://localhost:3000/api/eduaccred")
      .then(response => (this.eduaccred = response.data))
      .catch(error => {
        console.log(error);
        this.errored_eduaccred = true;
      })
      .finally(() => (this.loading_eduaccred = false));
    axios
      .get("http://localhost:3000/api/perevod")
      .then(response => (this.perevod = response.data))
      .catch(error => {
        console.log(error);
        this.errored_perevod = true;
      })
      .finally(() => (this.loading_perevod = false));
    axios
      .get("http://localhost:3000/api/eduop")
      .then(response => (this.eduop = response.data))
      .catch(error => {
        console.log(error);
        this.errored_eduop = true;
      })
      .finally(() => (this.loading_eduop = false));
    axios
      .get("http://localhost:3000/api/chislen")
      .then(response => (this.chislen = response.data))
      .catch(error => {
        console.log(error);
        this.errored_chislen = true;
      })
      .finally(() => (this.loading_chislen = false));
  }
};
</script>

