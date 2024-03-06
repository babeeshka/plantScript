import { mount } from '@vue/test-utils';
import RandomPlantDetails from '@/components/RandomPlantDetails.vue'

describe('RandomPlantDetails.vue', () => {
  it('renders plant details correctly', () => {
    const plant = {
      common_name: 'Daisy',
      scientific_name: ['Bellis perennis'],
      family: 'Asteraceae',
      type: 'Flower',
    };
    const wrapper = mount(RandomPlantDetails, {
      props: { plant }
    });
    expect(wrapper.text()).toContain('Daisy');
    expect(wrapper.text()).toContain('Bellis perennis');
    expect(wrapper.text()).toContain('Asteraceae');
    expect(wrapper.text()).toContain('Flower');
  });
});
