import { ChakraProvider } from '@chakra-ui/react';

export const withChakraUi = (Story) => (
  <ChakraProvider resetCSS>
    <Story />
  </ChakraProvider>
);
