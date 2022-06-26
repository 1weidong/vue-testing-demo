import { shallowMount } from '@vue/test-utils';
import TodoHeader from '../TodoHeader';

describe('TodoHeader.vue', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallowMount(TodoHeader);
    })

    test('new todo', async () => {
        const input = wrapper.find('input[data-testid="new-todo"]');
        const text = 'play';
        input.setValue(text);
        input.trigger('keyup.enter');
        expect(wrapper.emitted()['new-todo']).toBeTruthy();
        expect(wrapper.emitted()['new-todo'][0][0]).toBe(text);
        expect(input.element.value).toBe('');
    })

    test('new todo empty', async () => {
        const input = wrapper.find('input[data-testid="new-todo"]');
        const text = '';
        await input.setValue(text);
        input.trigger('keyup.enter');
        expect(wrapper.emitted('new-todo')).toBeFalsy();
    })

    test('header snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })
})