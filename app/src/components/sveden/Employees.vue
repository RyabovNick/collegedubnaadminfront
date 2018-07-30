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
</style>


<template>
    <v-app>
        <h1>Руководство</h1>
        <section v-if="errored">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>

        <section v-else>
            <div v-if="loading">Загрузка...</div>

            <v-data-table
            :headers="headersHeads"
            :items="heads"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td itemprop="fio" class="text-xs-left">{{ props.item.fio }}</td>
                <td itemprop="post" class="text-xs-right">{{ props.item.position }}</td>
                <td itemprop="telephone" class="text-xs-right">{{ props.item.telephone }}</td>
                <td itemprop="email" class="text-xs-right">
                    <a :href="`mailto:${props.item.email}`">
                        {{ props.item.email }}
                    </a>
                </td>
            </template>

            
        </v-data-table>
        </section>
        <h1>Педагогический состав</h1>
        <section v-if="errored">
            <p>Приносим извинения, произошла ошибка. Пожалуйста, повторите позднее</p>
        </section>

        <section v-else>
            <div v-if="loading">Загрузка...</div>
            <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>

            <v-data-table
            :headers="headersTeachingStaff"
            :items="teachingStaff"
            class="elevation-2"
            :search="search"
            rows-per-page-text="Записей на странице"
            >
                <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded">
                        <td itemprop="fio" class="text-xs-left">{{ props.item.fio }}</td>
                        <td itemprop="post" class="text-xs-right">{{ props.item.position }}</td>
                        <td itemprop="teachingDescipline" class="text-xs-right">{{ props.item.teachingDescipline }}</td>
                        <td itemprop="teachingLevel" class="text-xs-right">{{ props.item.teachingLevel }}</td>
                        <td itemprop="teachingQual" class="text-xs-right">{{ props.item.teachingQual }}</td>
                        <td itemprop="degree" class="text-xs-right">{{ props.item.degree }}</td>
                        <td itemprop="academStat" class="text-xs-right">{{ props.item.academStat }}</td>
                        <td itemprop="employeeQualification" class="text-xs-right">{{ props.item.employeeQualification }}</td>
                    </tr>
                </template>
                <template slot="expand" slot-scope="props">
                    <v-card flat>
                        <v-card-text itemprop="profDevelopment"><b>Повышение квалификации:</b> {{ props.item.profDevelopment }}</v-card-text>
                        <v-card-text itemprop="genExperience"><b>Общий стаж работы:</b> {{ props.item.genExperience }}</v-card-text>
                        <v-card-text itemprop="specExperience"><b>Стаж работы по специальности:</b> {{ props.item.specExperience }}</v-card-text>
                    </v-card>
                </template>
                <template slot="pageText" slot-scope="props">
                    Записей {{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}
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
      search: "",
      headersHeads: [
        {
          text: "ФИО",
          align: "left",
          sortable: false,
          value: "fio",
          width: "50%"
        },
        { text: "Должность", sortable: false, value: "post", width: "20%" },
        { text: "Телефон", sortable: false, value: "telephone", width: "10%" },
        { text: "Почта", sortable: false, value: "email", width: "20%" }
      ],
      headersTeachingStaff: [
        { text: "ФИО", align: "left", sortable: false, value: "fio" },
        { text: "Должность", sortable: false, value: "post" },
        {
          text: "Преподаваемые дисциплины",
          sortable: false,
          value: "teachingDiscipline"
        },
        {
          text: "Уровень образования",
          sortable: false,
          value: "teachingLevel"
        },
        { text: "Квалификация", sortable: false, value: "teachingQual" },
        { text: "Учёная степень", sortable: false, value: "degree" },
        { text: "Учёное звание", sortable: false, value: "academStat" },
        {
          text: "Наименование направления подготовки и (или) специальности",
          sortable: false,
          value: "employeeQualification"
        }
        /*{
          text: "Повышение квалификации",
          sortable: false,
          value: "profDevelopment"
        },
        { text: "Общий стаж работы", sortable: false, value: "genExperience" },
        {
          text: "Стаж работы по специальности",
          sortable: false,
          value: "specExperience"
        }*/
      ],
      heads: [],
      teachingStaff: [],
      loading: true,
      errored: false
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/heads")
      .then(response => (this.heads = response.data))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .get("http://localhost:3000/api/teachingstaff")
      .then(response => (this.teachingStaff = response.data))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

