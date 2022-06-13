import { shallowMount } from '@vue/test-utils';
import TodoHeader from '../TodoHeader';

describe('TodoHeader.vue', () => {
    test('new todo', async () => {
        const wrapper = shallowMount(TodoHeader);
        const input = wrapper.find('input[data-testid="new-todo"]');
        const text = 'play';
        input.setValue(text);
        input.trigger('keyup.enter');
        expect(wrapper.emitted()['new-todo']).toBeTruthy();
        expect(wrapper.emitted()['new-todo'][0][0]).toBe(text);
        expect(input.element.value).toBe('');
    })
})