import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    todos: [] as Array<Object>,
    visibility: "all",
    uid: 0,
  },
  mutations: {
    UPDATE_TODOS(state, todos) {
      state.todos = todos;
    },
    ADD_TODO(state, todo) {
      state.todos.push({
        id: state.uid,
        title: todo,
        completed: false,
      });

      state.uid++;
    },
    REMOVE_TODO(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    },
    SET_VISIBILITY(state, type) {
      state.visibility = type;
    },
  },
  actions: {
    updateTodos({ commit }, todos) {
      commit("UPDATE_TODOS", todos);
    },
    addTodo({ commit }, todo) {
      commit("ADD_TODO", todo);
    },
    removeTodo({ commit }, todo) {
      commit("REMOVE_TODO", todo);
    },
    setVisibility({ commit }, type) {
      commit("SET_VISIBILITY", type);
    },
  },
  modules: {},
});
