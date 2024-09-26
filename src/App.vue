<script lang="ts" setup>
import {ITodoItem, useTodoStore} from "./store/todoStore.ts";
import {computed, onMounted, ref} from "vue";

const todoStore = useTodoStore();

const todos = computed(() => todoStore.todos);
const startEdit = ref<number | null>(null);
const newTodoText = ref('');
const editTodoText = ref('');

const addNewTodo = (): void => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value);
    newTodoText.value = '';
  }
};

const deleteNewTodo = (id: number): void => {
  todoStore.deleteTodo(id);
}

const editTodo = (todo: ITodoItem): void => {
  startEdit.value = todo.id;
  editTodoText.value = todo.text;
}
const saveEdit = (todo: ITodoItem): void => {
  todoStore.editTodo(todo.id, editTodoText.value);
  cancelEdit();
}
const cancelEdit = (): void => {
  startEdit.value = null;
  editTodoText.value = ''
}

const toggleTodo = (id: number): void => {
  todoStore.toggleTodo(id);
}

onMounted(() => {
  todoStore.getTodos();
});
</script>

<template>
  <div class="todo-list">
    <h1>To-Do List</h1>

    <input v-model="newTodoText"
           placeholder="Add task.."
           @keyup.enter="addNewTodo"/>
    <button @click="addNewTodo">Add</button>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <div v-if="startEdit===todo.id">
          <input v-model="editTodoText"
                 @keyup.enter="saveEdit(todo)"/>
<!--          <button @click="saveEdit(todo)">Save</button>-->
          <button @click="cancelEdit">Cancel</button>
        </div>
        <div v-else>
          <input :checked="todo.completed" type="checkbox" @change="toggleTodo(todo.id)"/>
          <span :class="{'completed':todo.completed} " @click="editTodo(todo)">{{ todo.text }}</span>
          <button @click="editTodo(todo)">Edit</button>
          <button @click="deleteNewTodo(todo.id)">&times;</button>
        </div>

      </li>

    </ul>
  </div>

</template>

<style scoped>
.completed {
  text-decoration: line-through;
  color: grey;
}
</style>
