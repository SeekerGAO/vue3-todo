<template>
  <section class="main" v-show="todos.length" v-cloak>
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      v-model="allDone"
    />
    <label for="toggle-all"></label>
    <ul class="todo-list">
      <template v-for="todo in filteredTodos">
        <todo-item :todo="todo"></todo-item>
      </template>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import TodoItem from "./TodoItem.vue";
import filters from "../filters";
import { Todos, Todo } from "../types";

export default defineComponent({
  name: "TodoMain",
  components: {
    [TodoItem.name]: TodoItem,
  },
  setup(props, ctx) {
    const store = useStore();

    const todos = computed<Todos>(() => store.state.todos);
    const visibility = computed<string>(() => store.state.visibility);

    const allDone = computed<boolean>({
      get: function () {
        return filters.active(todos.value as Todos).length === 0;
      },
      set: function (value: boolean) {
        (todos.value as Todos).forEach(function (todo: Todo) {
          todo.completed = value;
        });
      },
    });

    const filteredTodos = computed<Todos>(() =>
      filters[visibility.value](todos.value as Todos)
    );

    return {
      todos,
      allDone,
      filteredTodos,
    };
  },
});
</script>
