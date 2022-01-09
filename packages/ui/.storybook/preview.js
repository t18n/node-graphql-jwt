import { addDecorator } from '@storybook/react';
import { theme as chakraTheme } from '@chakra-ui/react';

import { withChakraUi } from './custom-decorators/withChakraUi';

export const parameters = {
  backgrounds: {
    default: 'light',
    layout: 'fullscreen',
    values: [
      {
        name: 'light',
        value: chakraTheme.colors.gray['50'],
      },
      {
        name: 'dark',
        value: chakraTheme.colors.gray['900'],
      },
    ],
  },
};
