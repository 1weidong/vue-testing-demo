import {shallowMount} from '@vue/test-utils';
import TodoItem from '@/components/TodoApp/TodoItem';

describe('TodoItem.vue', () => {
    /** @type {import(@vue/test-utils).wrapper} */ 
    let wrapper = null;
    beforeEach(() => {
        const todo = {
            id: 1,
            text: 'play',
            done: true
        };
        wrapper = shallowMount(TodoItem, {
            propsData: {
                todo
            }
        });
    })

    test('text', () => {
        expect(wrapper.find('[data-testid="todo-text"]').text()).toBe(wrapper.vm.todo.text);
    })

    test('done', async () => {
        const done = wrapper.find('[data-testid="todo-done"]');
        const item = wrapper.find('[data-testid="todo-item"]');
        expect(done.element.checked).toBeTruthy();
        expect(item.classes()).toContain('completed');

        await done.setChecked(false);
        expect(item.classes('completed')).toBeFalsy();
    })

    test('del', async () => {
        const btn = wrapper.find('button[data-testid="todo-btn"]');
        await btn.trigger('click');
        expect(wrapper.emitted('del-todo')).toBeTruthy();
        expect(wrapper.emitted('del-todo')[0][0]).toBe(wrapper.vm.todo.id)
    })

    test('edit todo style', async () => {
        const label = wrapper.find('label[data-testid="todo-text"]');
        const todoItem = wrapper.find('li[data-testid="todo-item"]');
        const todoEdit = wrapper.find('input[data-testid="todo-edit"]');
        await label.trigger('dblclick');
        expect(todoItem.classes()).toContain('editing')
        
        await todoEdit.trigger('blur');
        expect(todoItem.classes('isEditing')).toBeFalsy();
    })

    test('edit todo', async () => {
        const todoEdit = wrapper.find('input[data-testid="todo-edit"]');
        expect(todoEdit.element.value).toBe(wrapper.vm.todo.text);
        const text = 'hello';
        await todoEdit.setValue(text)
        await todoEdit.trigger('keyup.enter');
        expect(wrapper.emitted('edit-todo')).toBeTruthy();
        expect(wrapper.emitted('edit-todo')[0][0]).toEqual({
            id: wrapper.vm.todo.id,
            text
        })
        // 取消编辑状态
        expect(wrapper.vm.isEditing).toBeFalsy();
    })

    test('Cancel edit todo', async () => {
        const label = wrapper.find('label[data-testid="todo-text"]');
        const todoEdit = wrapper.find('input[data-testid="todo-edit"]');
        
        await label.trigger('dblclick');
        const text = wrapper.vm.todo.text;
        await todoEdit.setValue('123');
        await todoEdit.trigger('keyup.esc');
        expect(wrapper.vm.todo.text).toBe(text);
        expect(wrapper.vm.isEditing).toBeFalsy();
    })

    test('snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })
})