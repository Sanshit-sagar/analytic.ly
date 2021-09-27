import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SelectMenu } from '../compositions/SelectMenu';

export default {
  title: 'Example/SelectMenu',
  component: SelectMenu,
} as ComponentMeta<typeof SelectMenu>;

const Template: ComponentStory<typeof SelectMenu> = (args) => <SelectMenu {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    label: 'atomic.select'
};
