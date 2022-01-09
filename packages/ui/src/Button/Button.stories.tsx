import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '.';
import { ChakraProvider } from '@chakra-ui/react';

export default {
  title: 'Button',
  component: Button,
  decorators: [(story) => <ChakraProvider>{story()}</ChakraProvider>],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  colorScheme: 'teal',
  size: 'xs',
  children: 'Button',
};
