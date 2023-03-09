<template>
  <div>
    <navbar/>
    <div class="cards">
        <card @click="openLang('english')">
        English
      </card>
      <card @click="openLang('french')">
        French
      </card>
      <card @click="openLang('spanish')">
        Spanish
      </card>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import Card from "~/components/card.vue";
import Navbar from "~/components/hat.vue";

export default Vue.extend({
  name: 'IndexPage',
  components: {Navbar, Card},
  methods: {
    openLang(lang) {
      this.$router.push('/' + lang);
    }
  }
})
</script>

<style>
.cards {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
}

html, body {
  height: 100%;
}

body {
  background: linear-gradient(to bottom right, #ab18ab, #ff75ff, #7f47b9, #a4a425);
}

@media screen and (max-width: 500px) {
  .cards {
    flex-direction: column;
  }
}

</style>
