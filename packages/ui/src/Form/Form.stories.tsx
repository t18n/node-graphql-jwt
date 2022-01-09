import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from '.';
import { ChakraProvider } from '@chakra-ui/react';

export default {
  title: 'Form/Input',
  component: Input,
  decorators: [(story) => <ChakraProvider>{story()}</ChakraProvider>],
} as ComponentMeta<typeof Input>;

const InputTemplate: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const EmailInput = InputTemplate.bind({});

EmailInput.args = {
  id: 'email',
  type: 'email',
  placeholder: 'example@example.com',
};
