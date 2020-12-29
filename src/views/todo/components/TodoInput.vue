<template>
  <input
    class="new-todo"
    autofocus
    autocomplete="off"
    placeholder="What needs to be done?"
    v-model="newTodo"
    v-focus
    @keyup.enter="addTodo"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TodoInput",
  setup(props, ctx) {
    const newTodo = ref("");
    const store = useStore();

    // Add new todo
    const addTodo = () => {
      const todo = newTodo.value && newTodo.value.trim();

      if (!todo) return;

      store.dispatch("addTodo", todo);

      newTodo.value = "";
    };

    return {
      newTodo,
      addTodo,
    };
  },
});
</script>
