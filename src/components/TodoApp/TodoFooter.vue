<template>
    <footer class="footer">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"><strong data-testid="done-todo-count">{{doneTodoCount}}</strong> item left</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <router-link exact to="/">All</router-link>
            </li>
            <li>
                <router-link to="/active">Active</router-link>
            </li>
            <li>
                <router-link to="/completed">Completed</router-link>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button
            v-if="completedTodoCount"
            data-testid="clear-completed-todo"
            class="clear-completed"
            @click="$emit('clear-completed')"
        >
            Clear completed
        </button>
    </footer>
</template>

<script>

export default {
    name: 'TodoFooter',
    props: {
        todos: {
            type: Array,
            require: true,
            default: () => []
        }
    },
    data() {
        return {
        };
    },
    computed: {
        doneTodoCount() {
            return this.todos.filter(t => !t.done).length;
        },
        completedTodoCount() {
            return this.todos.filter(t => t.done).length;
        },
    },
    watch: {},
    methods: {

    },
    created() {

    },
    mounted() {

    },
}
</script>
<style lang='scss' scoped>

</style>