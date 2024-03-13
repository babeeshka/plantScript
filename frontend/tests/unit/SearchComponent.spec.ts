// frontend/tests/unit/SearchComponent.spec.ts
import { mount } from '@vue/test-utils';
import SearchComponent from '@/components/SearchComponent.vue';

describe('SearchComponent.vue', () => {
  it('emits an event when a search is performed', async () => {
    const wrapper = mount(SearchComponent);
    const input = wrapper.find('input');
    await input.setValue('plant');
    await input.trigger('keyup.enter');
    expect(wrapper.emitted()).toHaveProperty('search');
  });
});
