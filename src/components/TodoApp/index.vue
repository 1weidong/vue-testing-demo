<template>
<section class="todoapp">
    <TodoHeader @new-todo="handleNewTodo" />
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input
          v-model="toggleAll"
          data-testid="toggle-all"
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
            <TodoItem
              v-for="todo in filterTodos"
              :key="todo.id"
              :todo="todo"
              @del-todo="handleDeleteTodo"
              @edit-todo="handleEditTodo"
            />
        </ul>
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <TodoFooter :todos="todos" @clear-completed="handleClearCompleted" />
</section>
</template>

<script>
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';
export default {
  name: "TodoApp",
  components: {
    TodoHeader,
    TodoItem,
    TodoFooter
  },
  data() {
    return {
      todos: []
    }
  },
  computed: {
    toggleAll: {
      get({todos}) {
        return todos.length && todos.every(t => t.done);
      },
      set(checked) {
        this.todos.forEach(t => {
          t.done = checked;
        });
      }
    },
    filterTodos() {
      const path = this.$route.path;
      let todos = this.todos;
      switch(path) {
        case '/active':
          todos = this.todos.filter(t => !t.done);
          break;
        case '/completed':
          todos = this.todos.filter(t => t.done);
          break;
      }
      return todos;
    }
  },
  methods: {
    handleNewTodo(text) {
      const lastTodo = this.todos[this.todos.length - 1];
      this.todos.push({
        id: lastTodo ? lastTodo.id + 1 : 1,
        text,
        done: false
      })
    },
    handleDeleteTodo(todoId) {
      const index = this.todos.findIndex(t => t.id === todoId);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },
    handleEditTodo({id, text}) {
      const todo = this.todos.find(t => t.id === id);
      if (!todo) return;
      if(!text.trim().length) {
        return this.handleDeleteTodo(id);
      }

      todo.text = text;
    },
    handleClearCompleted() {
      for(let i = 0; i < this.todos.length; i++) {
        if(this.todos[i].done) {
          this.todos.splice(i, 1);
          i--;
        }
      }
    }
  }
};
</script>