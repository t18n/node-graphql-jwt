import { FC } from 'react';
import { Flex, Stack, useColorModeValue } from '@node-graphql-jwt/ui';
import { Header } from './Header';

export const Layout: FC = ({ children }) => (
  <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    direction="column"
    bg={useColorModeValue('gray.50', 'gray.800')}
  >
    <Header />
    {children}
  </Flex>
);
