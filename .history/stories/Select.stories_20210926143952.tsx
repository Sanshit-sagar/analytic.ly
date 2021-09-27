import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SelectMenu } from '../compositions/SelectMenu';

export default {
  title: 'Example/Header',
  component: Heading,
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    label: 'atomic.heading'
};
