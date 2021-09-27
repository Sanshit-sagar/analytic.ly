import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Heading } from './Heading';

export default {
  title: 'Example/Header',
  component: Heading,
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
