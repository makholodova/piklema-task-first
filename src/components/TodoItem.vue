<template>
  <div v-if="startEdit===todo.id" class="todo-edit">
    <div class="todo-edit-content">
      <input :checked="todo.completed" class="todo-checkbox" type="checkbox" @change="handleToggle"/>
      <input v-model="editTodoText"
             @keyup.enter="saveEdit"/>
    </div>
    <div class="btn-container">
      <button class="btn" @click="saveEdit">&#128504;</button>
      <button class="btn" @click="cancelEdit">&#65794;</button>
    </div>
  </div>
  <div v-else class="todo-view">
    <div class="todo-content">
      <input :checked="todo.completed" class="todo-checkbox" type="checkbox" @change="handleToggle"/>
      <span :class="{'completed':todo.completed} " class="todo-text" @click="beginEdit">{{ todo.text }}</span>
    </div>
    <div class="btn-container">
      <button class="btn mirror-text" @click="beginEdit"> &#9998;</button>
      <button class="btn" @click="handleDelete"> &#128465;</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ITodoItem, useTodoStore} from "../store/todoStore.ts";

const props = defineProps<{
  todo: ITodoItem;
}>();

const {editTodo, deleteTodo, toggleTodo} = useTodoStore();

const startEdit = ref<number | null>(null);
const editTodoText = ref('');

const beginEdit = (): void => {
  startEdit.value = props.todo.id;
  editTodoText.value = props.todo.text;
}

const handleDelete = (): void => {
  deleteTodo(props.todo.id);
}

const saveEdit = (): void => {
  editTodo(props.todo.id, editTodoText.value);
  cancelEdit();
}
const cancelEdit = (): void => {
  startEdit.value = null;
  editTodoText.value = ''
}

const handleToggle = (): void => {
  toggleTodo(props.todo.id);
}

</script>

<style scoped>
.todo-edit, .todo-view {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.todo-edit {
  gap: 10px;
}

.todo-view {
  justify-content: space-between;
  gap: 50px;
}

.btn-container {
  display: flex;
  gap: 10px
}

.todo-checkbox {
  margin-right: 5px;
}

.todo-content {
  display: flex;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.todo-text {
  width: 300px;
  white-space: normal;
  overflow-wrap: break-word;
}

.mirror-text {
  transform: scaleX(-1);
  display: inline-block;
}
</style>