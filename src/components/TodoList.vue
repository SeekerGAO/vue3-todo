<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="handleAddTodo"
      />
    </header>
    <section class="main" v-show="todos.length" v-cloak>
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          class="todo"
          :key="todo.id"
          :class="{
            completed: todo.completed,
            editing: todo === editedTodo,
          }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label @dblclick="handleEditTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="handleRemoveTodo(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.title"
            v-todo-focus="todo === editedTodo"
            @blur="handleDoneEditTodo(todo)"
            @keyup.enter="handleDoneEditTodo(todo)"
            @keyup.esc="handleCancelEditTodo(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length" v-cloak>
      <span class="todo-count">
        <strong>{{ remaining }}</strong> {{ pluralize }} left
      </span>
      <ul class="filters">
        <li>
          <a
            href="#home?visibility=all"
            :class="{ selected: visibility === 'all' }"
            >All</a
          >
        </li>
        <li>
          <a
            href="#home?visibility=active"
            :class="{ selected: visibility === 'active' }"
            >Active</a
          >
        </li>
        <li>
          <a
            href="#home?visibility=completed"
            :class="{ selected: visibility === 'completed' }"
            >Completed</a
          >
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="handleClearCompletedTodo"
        v-show="todos.length > remaining"
      >
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Written by <a href="http://evanyou.me">Evan You</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watchEffect,
  watch,
} from "vue";
import { useStore } from "vuex";
import { useRouter, RouteLocationNormalizedLoaded } from "vue-router";
import Todo from "/@/views/todo/components/Todo.vue";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Todos = Array<Todo>;

interface Filters {
  [key: string]: (todos: Todos) => Todos;
}

// visibility filters
const filters: Filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  },
};

export default defineComponent({
  name: "TodoList",
  components: {
    [Todo.name]: Todo,
  },
  setup(props, ctx) {
    const router = useRouter();
    const store = useStore();

    const newTodo = ref("");
    const visibility = ref("all");
    const editedTodo = ref<null | Todo>(null);
    const beforeEditCache = ref("");

    const todos = ref<Todos>(store.state.todos);
    const filteredTodos = computed<Todos>(() =>
      filters[visibility.value](todos.value)
    );
    const remaining = computed<number>(
      () => filters.active(todos.value).length
    );
    const allDone = computed<boolean>({
      get: function () {
        return remaining.value === 0;
      },
      set: function (value: boolean) {
        todos.value.forEach(function (todo: Todo) {
          todo.completed = value;
        });
      },
    });
    const pluralize = computed<string>(() =>
      remaining.value === 1 ? "item" : "items"
    );

    watchEffect(() => {
      // 获取路由参数
      const currentRoute = router.currentRoute.value;
      const queryParam = (currentRoute as RouteLocationNormalizedLoaded).query
        .visibility as string;
      if (filters[queryParam]) {
        visibility.value = queryParam;
      } else {
        router.push("/");
        visibility.value = "all";
      }
    });

    watch(
      todos,
      (val, oldVal) => {
        store.dispatch("updateTodos", val);
      },
      { deep: true, immediate: true }
    );

    // 新增
    const handleAddTodo = () => {
      var value = newTodo.value && newTodo.value.trim();
      if (!value) return;

      todos.value.push({
        id: todos.value.length,
        title: value,
        completed: false,
      });

      newTodo.value = "";
    };

    // 删除
    const handleRemoveTodo = (todo: Todo) => {
      todos.value.splice(todos.value.indexOf(todo), 1);
    };

    // 移除已完成
    const handleClearCompletedTodo = () => {
      todos.value = filters.active(todos.value);
    };

    // 编辑
    const handleEditTodo = (todo: Todo) => {
      console.log(todo);
      beforeEditCache.value = todo.title;
      editedTodo.value = todo;
    };

    // 完成编辑
    const handleDoneEditTodo = (todo: Todo) => {
      if (!editedTodo.value) return;
      editedTodo.value = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        handleRemoveTodo(todo);
      }
    };

    // 取消编辑
    const handleCancelEditTodo = (todo: Todo) => {
      editedTodo.value = null;
      todo.title = beforeEditCache.value;
    };

    return {
      newTodo,
      todos,
      remaining,
      allDone,
      pluralize,
      visibility,
      filteredTodos,
      handleAddTodo,
      handleRemoveTodo,
      handleClearCompletedTodo,
      handleEditTodo,
      editedTodo,
      beforeEditCache,
      handleDoneEditTodo,
      handleCancelEditTodo,
    };
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    "todo-focus": function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
});
</script>

<style lang="scss"></style>
