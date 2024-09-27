<template>
  <div class="todo-input-container">
    <input v-model="newTodoText" class="todo-input"
           placeholder="Add task"
           @keyup.enter="addNewTodo"/>
    <button class="btn" @click="addNewTodo">+</button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useTodoStore} from "../store/todoStore.ts";

const todoStore = useTodoStore();

const newTodoText = ref('');
const addNewTodo = (): void => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value);
    newTodoText.value = '';
  }
};
</script>

<style scoped>
.todo-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 22px;
}
</style>