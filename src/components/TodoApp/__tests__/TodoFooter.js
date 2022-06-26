import { mount, createLocalVue } from "@vue/test-utils";
import TodoFooter from "@/components/TodoApp/TodoFooter";
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter)

const router = new VueRouter({
    linkActiveClass: 'selected'
});

describe('TodoFooter.vue', () => {
    /** @type {import{@vue/test-utils}.wappper} */
    let wrapper = null;

    beforeEach(async () => {
        wrapper = mount(TodoFooter, {
            localVue,
            router
        });
        const todos = [
            {id: 1, text: 'eat', done: false},
            {id: 2, text: 'play', done: true},
            {id: 3, text: 'sleep', done: false},
        ];
        await wrapper.setData({todos});
    })

    test('done todo count', async () => {
        const count = wrapper.vm.todos.filter(t => !t.done).length;
        const countEl = wrapper.find('[data-testid="done-todo-count"]');
        expect(Number(countEl.text())).toBe(count);
    })

    test('Clear Completed Show', async () => {
        const clearBtn = wrapper.find('[data-testid="clear-completed-todo"]');
        expect(clearBtn.exists()).toBeTruthy();
        
        wrapper = mount(TodoFooter, {
            propsData: {
                todos: [
                    {id: 1, text: 'eat', done: false},
                    {id: 2, text: 'play', done: false},
                    {id: 3, text: 'sleep', done: false},
                ]
            },
            localVue,
            router
        })
        expect(wrapper.find('[data-testid="clear-completed-todo"]').exists()).toBeFalsy();
    })

    test('Clear Completed', async () => {
        const clearBtn = wrapper.find('[data-testid="clear-completed-todo"]');
        clearBtn.trigger('click');
        expect(wrapper.emitted('clear-completed')).toBeTruthy();
    })

    test('router link actvieClass', async () => {
        const links = wrapper.findAllComponents({name: 'RouterLink'});
        router.push('/active');
        await localVue.nextTick();
        for (let i = 0; i < links.length; i++) {
            const link = links.at(i);
            if(link.vm.to === '/active') {
                expect(link.classes()).toContain('selected');
            } else {
                expect(link.classes('selected')).toBeFalsy();
            }
        }

        router.push('/completed');
        await localVue.nextTick();
        for (let i = 0; i < links.length; i++) {
            const link = links.at(i);
            if(link.vm.to === '/completed') {
                expect(link.classes()).toContain('selected');
            } else {
                expect(link.classes('selected')).toBeFalsy();
            }
        }

        router.push('/');
        await localVue.nextTick();
        for (let i = 0; i < links.length; i++) {
            const link = links.at(i);
            if(link.vm.to === '/') {
                expect(link.classes()).toContain('selected');
            } else {
                expect(link.classes('selected')).toBeFalsy();
            }
        }
    })

    test('snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })
})