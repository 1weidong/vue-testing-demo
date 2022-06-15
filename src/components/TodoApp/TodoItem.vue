<template>
    <li class="completed">
        <div class="view">
            <input class="toggle" type="checkbox" checked>
            <label>Taste JavaScript</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
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
    components: {},
    data() {
        return {
        };
    },
    computed: {},
    watch: {},
    methods: {

    },
    created() {

    },
    mounted() {

    }
}
</script>
<style lang='scss' scoped>

</style>