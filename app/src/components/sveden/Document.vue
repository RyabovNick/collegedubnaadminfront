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
            <h1>Документы</h1>
            <p>Колледж является структурным подразделением государственного 
                бюджетного образовательного учреждения высшего образования 
                Московской области Университет «Дубна». Просмотреть документы 
                можно на сайте университета.</p>
            <v-btn href="https://www.uni-dubna.ru/sveden/document" target="blank__"
                depressed large color="primary" class="v-btn--size">
                Открыть документы</v-btn>
        </v-container>
    </v-app>
</template>
