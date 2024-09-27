import {defineStore} from "pinia";

export interface ITodoItem {
	id: number;
	text: string;
	completed: boolean;
}

export const useTodoStore = defineStore('todo', {
	state: () => ({
		todos: [] as ITodoItem[],
	}),
	actions: {
		getTodos(): void {
			const items = localStorage.getItem('todos');
			if (items) {
				try {
					this.todos = JSON.parse(items);
				} catch (error) {
					console.error('Error parsing todos from localStorage:', error);
				}
			}
		},
		saveToLocalStorage(): void {
			localStorage.setItem('todos', JSON.stringify(this.todos));
		},
		addTodo(text: string): void {
			const newTodo: ITodoItem = {
				id: Date.now(),
				text: text,
				completed: false,
			};
			this.todos.push(newTodo);
			this.saveToLocalStorage();
		},
		editTodo(id: number, newText: string): void {
			const todo = this.todos.find(p => p.id === id);
			if (todo) todo.text = newText;
			this.saveToLocalStorage();
		},
		deleteTodo(id: number): void {
			this.todos = this.todos.filter(p => p.id !== id);
			this.saveToLocalStorage();
		},
		toggleTodo(id: number): void {
			const todo = this.todos.find(p => p.id === id);
			if (todo) todo.completed = !todo.completed;
			this.saveToLocalStorage();
		}

	},
});
