<template>
  <div class="questions">
    <div class="card">
      <button class="btn-close" aria-label="Close" @click="close"></button>
      <div class="card-header" v-if="!$store.state.complete ">
        {{ $store.state.question.question }}
      </div>
      <p v-if="$store.state.complete || $store.state.question.id === 0">Ваш результат: {{$store.state.rightsAnswers}} из {{$store.state.total}}</p>
      <ul class="list-group list-group-flush"
          v-if="$store.state.question.id !== 0 && !$store.state.complete">
        <button class="list-group-item first" @click="choose($store.state.answers[0], 1)" >{{ $store.state.answers[0] }}</button>
        <button class="list-group-item second" @click="choose($store.state.answers[1], 2)" >{{ $store.state.answers[1] }}</button>
        <button class="list-group-item third" @click="choose($store.state.answers[2], 3)" >{{ $store.state.answers[2] }}</button>
        <button class="list-group-item fourth" @click="choose($store.state.answers[3], 4)" >{{ $store.state.answers[3] }}</button>
      </ul>
      <p v-if="$store.state.explanation">{{$store.state.explanation}}</p>
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="button" @click="check"
                v-if="!$store.state.complete && $store.state.mod === 'practice'  && $store.state.question.id !== 0">
          Check
        </button>
        <button class="btn btn-primary" type="button" @click="next"
                v-if="!$store.state.complete && $store.state.question.id !== 0">
          Next
        </button>
        <button class="btn btn-primary" type="button" @click="$store.commit('complete')"
                v-if="!$store.state.complete && $store.state.mod === 'practice'
                && $store.state.question.id !== 0">
          Complete test
        </button>
        <button class="btn btn-primary" type="button" @click="restart"
                v-if="$store.state.complete || $store.state.question.id === 0">
          Restart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "questions",
  data() {
    return {
      backBtn1: 'white',
      backBtn2: 'white',
      backBtn3: 'white',
      backBtn4: 'white',
    }
  },

  methods: {
    choose(answer, flag) {
      switch (flag) {
        case 1:
          this.backBtn1= '#dadada';
          this.backBtn2= 'white';
          this.backBtn3= 'white';
          this.backBtn4= 'white';
          break;
        case 2:
          this.backBtn1 = 'white';
          this.backBtn2 = '#dadada';
          this.backBtn3 = 'white';
          this.backBtn4 = 'white';
          break;
        case 3:
          this.backBtn1 = 'white';
          this.backBtn2 = 'white';
          this.backBtn3 = '#dadada';
          this.backBtn4 = 'white';
          break;
        case 4:
          this.backBtn1 = 'white';
          this.backBtn2 = 'white';
          this.backBtn3 = 'white';
          this.backBtn4 = '#dadada';
          break;
      }
      this.$store.commit('setAnswer', answer);
    },

    close() {
      this.$store.commit('changeVisible');
      this.$store.commit('clear');
      this.backBtn1 = 'white';
      this.backBtn2 = 'white';
      this.backBtn3 = 'white';
      this.backBtn4 = 'white';
    },

    check() {
      this.$store.dispatch('getAnswer', false);
    },
    async next() {
      this.backBtn1 = 'white';
      this.backBtn2 = 'white';
      this.backBtn3 = 'white';
      this.backBtn4 = 'white';
      this.$store.commit('incrementTotal');
      await this.$store.dispatch('getAnswer', true);
      await this.$store.dispatch('getQuestion');
      if (this.$store.state.total === 10 && this.$store.state.mod === 'test') {
        this.$store.commit('complete');
      }
    },

    async restart() {
      await this.$store.dispatch('getStart', this.$route.params.lang);
      this.$store.commit('restart');

    }
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
}

.card {
  width: 45%;
  padding: 10px;
  display: flex;
  background: #a2b3ff;
  height: fit-content;
  flex-direction: column;
  align-items: center;
}

.btn-close {
  margin-left: 93%;
  margin-bottom: 10px;
}

.btn-primary {
  margin: 10px 0;
}

.list-group-item {
  margin-top: 10px;
  border-radius: 5px;
  height: fit-content;
}

.first {
  background: v-bind(backBtn1);
}

.second {
  background: v-bind(backBtn2);
}

.third {
  background: v-bind(backBtn3);
}

.fourth {
  background: v-bind(backBtn4);
}

.list-group {
  width: 70%;
}


.btn {
  background: #ffeb89;
  color: #7f47b9;
}

.d-grid {
  width: 90%;
}

@media screen and (max-width: 450px) {
  .card {
    width: 70%;
    font-size: 0.9em;
  }

  .card-header{
    height: fit-content;
  }

  @media screen and (max-width: 230px) {
    .card {
      width: 90%;
      font-size: 0.9em;
    }
    .btn-close {
      margin-left: 90%;
    }


    button {
      height: 30px;
      display: flex;
      font-size: 0.9em;
      justify-content: center;
      align-items: center;
    }

    .btn {
      margin-bottom: 0;
    }
  }
}

</style>
