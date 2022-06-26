import { shallowMount } from "@vue/test-utils";
import TodoApp from '@/components/TodoApp/index';
import TodoItem from '@/components/TodoApp/TodoItem';
import Vue from "vue";

describe('TodoApp', () => {
    /** @type {import{@vue/test-utils}.wrapper} */ 
    let wrapper = null;

    beforeEach(async () => {
        const $route = {
            path: ''
        }
        wrapper = shallowMount(TodoApp, {
            mocks: {
                $route
            }
        });
        const todos = [
            {id: 1, text: 'eat', done: false},
            {id: 2, text: 'play', done: true},
            {id: 3, text: 'sleep', done: false},
        ];
        await wrapper.setData({todos});
    })

    test('new todo', async () => {
        const text = 'play';
        wrapper.vm.handleNewTodo(text);
        const todo = wrapper.vm.todos.find(t => t.text === text);
        expect(todo).toBeTruthy();
    })

    test('Todo List', async () => {
        expect(wrapper.findAllComponents(TodoItem).length).toBe(wrapper.vm.todos.length)
    })

    test('delete todo', async () => {
        await wrapper.vm.handleDeleteTodo(1);
        expect(wrapper.vm.todos.length).toBe(2);
        expect(wrapper.findAllComponents(TodoItem).length).toBe(2);
    })

    test('delete todo', async () => {
        await wrapper.vm.handleDeleteTodo(123);
        expect(wrapper.vm.todos.length).toBe(3);
        expect(wrapper.findAllComponents(TodoItem).length).toBe(3);
    })

    test('eidt todo', async () => {
        const todo = {
            id: 2,
            text: 'world'
        };
        await wrapper.vm.handleEditTodo(todo);
        expect(wrapper.vm.todos[1].text).toBe(todo.text);

        todo.text = '';
        await wrapper.vm.handleEditTodo(todo);
        expect(wrapper.vm.todos.find(t => t.id === todo.id)).toBeFalsy();
    })

    test('toggle-all', async () => {
        const toggleAll = wrapper.find('input[data-testid="toggle-all"]');
        await toggleAll.setChecked();
        wrapper.vm.todos.forEach(t => {
            expect(t.done).toBeTruthy();
        });
        await toggleAll.setChecked(false);
        wrapper.vm.todos.forEach(t => {
            expect(t.done).toBeFalsy();
        });
    })

    test('toggle all state', async () => {
        const toggleAll = wrapper.find('input[data-testid="toggle-all"]');
        wrapper.vm.todos.forEach(todo => {
            todo.done = true;
        })
        await Vue.nextTick();
        expect(toggleAll.element.checked).toBeTruthy();

        wrapper.vm.todos[0].done = false;
        await Vue.nextTick();
        expect(toggleAll.element.checked).toBeFalsy();
    })

    test('toggle all style', async () => {
        const toggleAll = wrapper.find('input[data-testid="toggle-all"]');
        wrapper.vm.todos = [];
        await Vue.nextTick();
        expect(toggleAll.element.checked).toBeFalsy();
    })

    test('Clear All Completed', async () => {
        wrapper.vm.handleClearCompleted();
        await Vue.nextTick();
        expect(wrapper.vm.todos).toEqual([
            {id: 1, text: 'eat', done: false},
            {id: 3, text: 'sleep', done: false}
        ])
    })

    test('Filter Todos', async () => {
        // 当目录为'/', filterTodos为全部数据
        wrapper.vm.$route.path = '/';
        await Vue.nextTick();
        expect(wrapper.vm.filterTodos).toEqual([
            {id: 1, text: 'eat', done: false},
            {id: 2, text: 'play', done: true},
            {id: 3, text: 'sleep', done: false},
        ]);

        // 当目录为'/active', filterTodos为所有未完成数据
        wrapper.vm.$route.path = '/active';
        await Vue.nextTick();
        expect(wrapper.vm.filterTodos).toEqual([
            {id: 1, text: 'eat', done: false},
            {id: 3, text: 'sleep', done: false},
        ]);
        // 当目录为'/completed', filterTodos为所有已完成任务
        wrapper.vm.$route.path = '/completed';
        await Vue.nextTick();
        expect(wrapper.vm.filterTodos).toEqual([
            {id: 2, text: 'play', done: true},
        ]);
    })
})