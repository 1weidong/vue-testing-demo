<template>
    <li data-testid="todo-item" :class="{completed: todo.done, editing: isEditing}">
        <div class="view">
            <input v-model="todo.done" data-testid="todo-done" class="toggle" type="checkbox">
            <label data-testid="todo-text" @dblclick="isEditing = true">{{todo.text}}</label>
            <button data-testid="todo-btn" class="destroy" @click="handleDel"></button>
        </div>
        <input
            :value="todo.text"
            v-focus="isEditing"
            data-testid="todo-edit"
            class="edit"
            @keyup.enter="handleEditTodo"
            @blur="isEditing = false"
            @keyup.esc="isEditing = false"
        >
    </li>
</template>

<script>

export default {
    name: 'TodoItem',
    props: {
        todo: {
            type: Object,
            require: true,
            default: () => {}
        }
    },
    directives: {
        focus(element, binding) {
            if(binding.value) {
                element.focus();
            }
        }
    },
    components: {},
    data() {
        return {
            isEditing: false
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleDel() {
            this.$emit('del-todo', this.todo.id)
        },
        handleEditTodo(e) {
            this.$emit('edit-todo', {
                id: this.todo.id,
                text: e.target.value
            })

            this.isEditing = false;
        }
    },
    created() {

    },
    mounted() {

    }
}
</script>
<style lang='scss' scoped>

</style>