import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { setAccessToken } from '../utils/accessToken';
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
import { Layout } from '../components/Layout';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(`Form submitted`);
    const response = await login({
      variables: {
        email,
        password,
      },
      update: (store, { data }) => {
        if (!data) return null;
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data.login.user,
          },
        });
      },
    });

    console.log(response);

    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
    }

    history.push('/');
  };

  return (
    <Layout>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in</Heading>
        </Stack>
        <form onSubmit={onSubmit}>
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
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Layout>
  );
};
