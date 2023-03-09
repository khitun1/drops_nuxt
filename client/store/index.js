
export const state = () => ({
  visibleMenu: true,
  mod: '',
  question: {},
  answers: [],
  answer: '',
  explanation: '',
  rightsAnswers: 0,
  total: Number,
  complete: false,
})

export const getters = {
  visibleMenu: s => s.visibleMenu
}

export const mutations = {
  changeVisible(state, mod = '') {
    state.mod = mod;
    state.rightsAnswers = 0;
    state.total = 0;
    state.complete = false;
    return state.visibleMenu = !state.visibleMenu;
  },

  clear(state) {
    state.question = {};
    state.answers = [];
    state.answer = '';
  },

  incrementTotal(state){
      if (state.question.id !== 0) ++state.total;
  },

  complete(state) {
    state.complete = true;
  },

  restart(state) {

    state.total = 0;
    state.complete = false;
  },

  setQuestion(state, q) {
    state.explanation = '';
    state.question = {
      question: q.question,
      id: q.id,
    };
    state.answers = q.answers
  },

  setAnswer(state, answer) {
    state.answer = answer;
  },

  setExplanation(state, explanation) {
    state.explanation = explanation;
    if (explanation === 'Верно!') state.rightsAnswers += 1;
  }
}

export const actions = {
  async getStart({commit, state}, lang) {
    const {data} = await this.$axios.post('http://localhost:7000/start', {
      lang: lang,
    })
    commit('setQuestion', data);
  },

  async getQuestion({commit}) {
    const {data} = await this.$axios.get('http://localhost:7000/getQuestion');
    commit('setQuestion', data);
  },

  async getAnswer({state, commit}, flag) {
    const {data} = await this.$axios.post('http://localhost:7000/getAnswer', {
      id: state.question.id,
      answer: state.answer,
      next: flag,
    });
    commit('setExplanation', data);
  },


}
