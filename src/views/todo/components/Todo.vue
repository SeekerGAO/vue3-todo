<template>
  <li
    class="todo"
    :key="todo.id"
    :class="{
      completed: todo.completed,
      editing: todo === editedTodo,
    }"
  >
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.completed" />
      <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
    <input
      class="edit"
      type="text"
      v-model="todo.title"
      v-focus="todo === editedTodo"
      @blur="doneEditTodo(todo)"
      @keyup.enter="doneEditTodo(todo)"
      @keyup.esc="cancelEditTodo(todo)"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from "vue";
import { Todo } from "../types";

export default defineComponent({
  name: "Todo",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  emits: ["current:todoValue"],
  setup(props, ctx) {
    const { todo } = toRefs(props);
    const editedTodo = ref<null | Todo>(null);
    const beforeEditCache = ref<string>("");

    const removeTodo = (todo: Todo) => {
      ctx.emit("current:todoValue", todo);
    };
    const editTodo = (todo: Todo) => {
      beforeEditCache.value = todo.title;
      editedTodo.value = todo;
    };
    const doneEditTodo = (todo: Todo) => {
      if (!editedTodo.value) return;
      editedTodo.value = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        removeTodo(todo);
      }
    };
    const cancelEditTodo = (todo: Todo) => {
      editedTodo.value = null;
      todo.title = beforeEditCache.value;
    };

    return {
      todo,
      editedTodo,
      removeTodo,
      editTodo,
      doneEditTodo,
      cancelEditTodo,
    };
  },
});
</script>
