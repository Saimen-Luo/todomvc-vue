;(function (exports) {
	exports.vm = new Vue({
		el: '#todoapp',
		data: {
			title: 'TodoList',
			editingTodo: null,
			todos: JSON.parse(localStorage.getItem('todos-vue') || '[]'),
			todoLocation: 'all'
		},
		watch: {
			todos: {
				deep: true,
				handler: function (value) {
					localStorage.setItem('todos-vue', JSON.stringify(value))
				}
			}
		},
		computed: {
			counter() {
				// const todos = this
				const unfinishedTodos = this.todos.filter((item) => !item.finished)
				return unfinishedTodos.length
			},
			itemOrItems() {
				return this.counter === 1 ? 'item' : 'items'
			},
			filterTodos() {
				if (this.todoLocation === 'all') {
					return this.todos
				} else if (this.todoLocation === 'active') {
					return this.todos.filter((item) => !item.finished)
				} else {
					return this.todos.filter((item) => item.finished)
				}
			}
		},
		methods: {
			deleteTodo(todo) {
				this.todos.splice(this.todos.indexOf(todo), 1)
			},
			addTodo(evnet) {
				const title = evnet.target.value.trim()
				if (title) {
					this.todos.unshift({
						id: this.todos.length + 1,
						title: title,
						finished: false
					})
				}
				evnet.target.value = ''
			},
			toggleAll(event) {
				this.todos.forEach(item => item.finished = event.target.checked)
			},
			editTodo(todo) {
				this.beforeEditCache = todo.title
				this.editingTodo = todo
			},
			doneEdit(todo) {
				this.editingTodo = null
				todo.title = todo.title.trim()
				if (!todo.title) {
					this.deleteTodo(todo)
				}
			},
			cancelEdit(todo) {
				this.editingTodo = null
				todo.title = this.beforeEditCache
			},
			clearCompleted() {
				this.todos = this.todos.filter((item) => !item.finished)
			}
		},
		directives: {
			'todo-focus': function (el, bindings) {
				if (bindings.value) {
					el.focus()
				}
			}
		}

	});
})(window)
