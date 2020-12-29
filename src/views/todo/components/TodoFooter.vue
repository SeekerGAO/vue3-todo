<template>
  <footer class="footer" v-show="todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ pluralize }} left
    </span>
    <ul class="filters">
      <li v-for="tag in tags">
        <a
          :href="`#todo?visibility=${tag.visibility}`"
          :class="{ selected: visibility === tag.visibility }"
          >{{ tag.text }}</a
        >
      </li>
    </ul>
    <button
      class="clear-completed"
      @click="clearCompletedTodo"
      v-show="todos.length > remaining"
    >
      Clear completed
    </button>
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from "vue";
import { useRouter, RouteLocationNormalizedLoaded } from "vue-router";
import { useStore } from "vuex";
import filters from "../filters";
import { Todos } from "../types";

export default defineComponent({
  name: "TodoFooter",
  data() {
    return {
      tags: [
        { text: "All", visibility: "all" },
        {
          text: "Active",
          visibility: "active",
        },
        {
          text: "Completed",
          visibility: "completed",
        },
      ],
    };
  },
  setup(props, ctx) {
    const router = useRouter();
    const store = useStore();

    const todos = computed<Todos>(() => store.state.todos);
    const visibility = computed<string>(() => store.state.visibility);

    const remaining = computed<number>(
      () => filters.active(todos.value as Todos).length
    );
    const pluralize = computed<string>(() =>
      remaining.value === 1 ? "item" : "items"
    );

    watchEffect(() => {
      // Get router param
      const currentRoute = router.currentRoute.value;
      const queryParam = (currentRoute as RouteLocationNormalizedLoaded).query
        .visibility as string;
      if (filters[queryParam]) {
        store.dispatch("setVisibility", queryParam);
      } else {
        router.push("/todo");
        store.dispatch("setVisibility", "all");
      }
    });

    // Remove completed todo
    const clearCompletedTodo = () => {
      store.dispatch("updateTodos", filters.active(todos.value as Todos));
    };

    return {
      todos,
      visibility,
      remaining,
      pluralize,
      clearCompletedTodo,
    };
  },
});
</script>
