<style>
.v-footer {
  text-align: center;
}
</style>


<template>
  <v-footer height="auto">
    <v-card flat tile class="flex">
      <v-card-text class="grey lighten-3">
        <v-layout>
          <v-flex xs12 layout column>
            <span class="body-2">
              <b>КОНТАКТЫ</b>
            </span>
            <div>
              <v-icon size="18px" class="mr-3">home</v-icon>141980, Московская область, г. Дубна, ул. Энтузиастов, д. 21
            </div>
            <div>
              <v-icon size="18px" class="mr-3">contact_mail</v-icon>
              <a :href="`mailto:college@uni-dubna.ru`">college@uni-dubna.ru</a>
            </div>
            <div>
              <v-icon size="18px" class="mr-3">phone</v-icon>8(496)216-61-52, 8(496)216-61-71, 216-61-67
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="grey lighten-2 justify-center">&copy;2019 —
        <strong>Колледж университета "Дубна"</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({})
};
</script>