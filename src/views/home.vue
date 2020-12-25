<template>
  <div class="home-container">
    <div class="todo-main">
      <TodoList></TodoList>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import TodoList from "/@/components/TodoList.vue";

interface Book {
  title: string;
  author: string;
  year: number;
}

export default defineComponent({
  name: "Home",
  components: {
    TodoList,
  },
  props: {
    message: {
      type: String,
      defalut: "dhfaf",
    },
  },
  data() {
    return {
      count: 0,
      book: {
        title: "Vue 3 Guide",
        author: "Vue Team",
        year: 2020,
      } as Book,
    };
  },
  setup(props, ctx) {
    console.log({ ...props }, { ...ctx });
    const year = ref();
    const flag = ref(true);

    const book = reactive<Partial<Book>>({ title: "a", author: "a" });

    const num = computed(() => year.value * 2000);
  },
  mounted() {},
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username;
    },
  },
  methods: {
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/login");
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
