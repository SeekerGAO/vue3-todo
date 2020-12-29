<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <todo-input />
    </header>
    <todo-main />
    <todo-footer />
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Written by <a href="http://evanyou.me">Evan You</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import TodoInput from "./components/TodoInput.vue";
import TodoItem from "./components/TodoItem.vue";
import TodoFooter from "./components/TodoFooter.vue";
import TodoMain from "./components/TodoMain.vue";
import { Todos } from "./types";

export default defineComponent({
  name: "TodoList",
  components: {
    [TodoInput.name]: TodoInput,
    [TodoItem.name]: TodoItem,
    [TodoFooter.name]: TodoFooter,
    [TodoMain.name]: TodoMain,
  },
  setup(props, ctx) {
    const store = useStore();

    const todos = computed<Todos>(() => store.state.todos);

    watch(
      todos,
      (val, oldVal) => {
        store.dispatch("updateTodos", val);
      },
      { deep: true, immediate: true }
    );

    return {
      todos,
    };
  },
});
</script>

<style lang="scss"></style>
