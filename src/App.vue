<template>
  <div class="todo-list">
    <h1>To-Do List</h1>
    <TodoInput/>
    <TodoList/>
  </div>
</template>

<script lang="ts" setup>
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import {onMounted} from "vue";
import {useTodoStore} from "./store/todoStore.ts";

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.getTodos();
});
</script>

<style scoped>

</style>
