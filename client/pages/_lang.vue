<template>
  <main>
    <navbar/>
    <div v-if="$store.state.mod === 'test'"
         class="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar progress-bar-striped" :style="{width: progWidth}"></div>
    </div>
    <div class="cards" v-show="$store.getters.visibleMenu">
      <card @click="start('practice')">
        Practice
      </card>
      <card @click="start('test')">
        Test
      </card>
    </div>

    <div class="questions" v-show="!$store.getters.visibleMenu">
      <questions/>
    </div>
  </main>
</template>

<script>
import Questions from "~/components/questions.vue";
import Navbar from "~/components/hat.vue";

export default {
  name: "_lang",
  computed: {
    progWidth() {
      return (this.$store.state.total * 10) + '%';
    }
  },
  components: {Navbar, Questions},
  methods: {
    start(mod) {
      this.$store.dispatch('getStart', this.$route.params.lang);
      this.$store.commit('changeVisible', mod);
    }
  },
}
</script>

<style scoped>
html, body, main {
  height: 753px;
}

.progress {
  margin-left: 15%;
  width: 70%;
  background: #ffeb89;
}

body, main {
  background: linear-gradient(to bottom right, #ab18ab, #ff75ff, #7f47b9, #a4a425);
}

.cards {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
}

.questions {
  margin-top: 1%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-bar {
  background: linear-gradient(to bottom right, #ffff00, #ff75ff, #358fff, #7f47b9 );
}

@media screen and (max-width: 500px) {
  .cards {
    flex-direction: column;
  }

  body, main {
    min-height: 753px;
    height: fit-content;
  }
}
</style>
