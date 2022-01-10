import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Layout } from '../components/Layout';
import { useRegisterMutation } from '../generated/graphql';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@node-graphql-jwt/ui';

export const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  const onRegister = async (e) => {
    e.preventDefault();
    console.log(`Form submitted`);
    const response = await register({
      variables: {
        email,
        password,
      },
    });

    console.log(response);
    history.push('/');
  };

  return (
    <Layout>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign Up</Heading>
        </Stack>
        <form onSubmit={onRegister}>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="text"
                  value={email}
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={20}>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Layout>
  );
};
