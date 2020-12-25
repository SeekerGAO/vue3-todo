import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    todos: [] as Array<string>,
  },
  mutations: {
    updateTodos(state, todos) {
      state.todos = todos;
    },
  },
  actions: {
    updateTodos({ commit }, todos) {
      commit("updateTodos", todos);
    },
  },
  modules: {},
});
