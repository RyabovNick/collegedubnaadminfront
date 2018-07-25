<style scoped>
    .container {
        max-width: 40em;
        margin: auto;
    }

    .container p {
        text-align: center;
        font-size: 1.35em;
    }

    .v-btn--size {
        width: 100%;
    }
</style>


<template>
    <v-app>
        <v-container>
            <h1>Платные образовательные услуги</h1>
            <p>Колледж является структурным подразделением государственного
                 бюджетного образовательного учреждения высшего образования
                  Московской области Университет «Дубна». Просмотреть информацию
                   о платных образовательных услугах можно на сайте университета</p>
            <v-btn href="https://www.uni-dubna.ru/sveden/paid_edu" target="blank__"
                depressed large color="primary"  class="v-btn--size">
                Открыть платные образовательные услуги</v-btn>
        </v-container>
    </v-app>
</template>
