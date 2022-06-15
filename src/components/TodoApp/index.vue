<template>
<section class="todoapp">
    <TodoHeader @new-todo="handleNewTodo" />
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
            <TodoItem
              v-for="item in todos"
              :key="item.id"
            />
        </ul>
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <TodoFooter />
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
  methods: {
    handleNewTodo(text) {
      const lastTodo = this.todos[this.todos.length - 1];
      this.todos.push({
        id: lastTodo ? lastTodo.id + 1 : 1,
        text,
        done: false
      })
    }
  }
};
</script>