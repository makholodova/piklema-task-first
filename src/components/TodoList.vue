<template>
  <div>
    <TodoItem
        v-for="todo in todoList "
        :key="todo.id"
        :todo="todo"/>
  </div>
</template>
<script lang="ts" setup>
import {computed} from "vue";
import TodoItem from "./TodoItem.vue";
import {useTodoStore} from "../store/todoStore.ts";

const todoStore = useTodoStore();

const todoList = computed(() => todoStore.todos);
</script>
<style scoped>
</style>