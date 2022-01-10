import React from 'react';
import { Link as NextLink } from 'react-router-dom';
import { useLogOutMutation, useMeQuery } from '../generated/graphql';
import { setAccessToken } from '../configs/accessToken';
import { Link, Button, Stack, Text } from '@node-graphql-jwt/ui';

const MenuItem = ({ children, to, ...rest }) => {
  return (
    <Link>
      <NextLink to={to}>{children}</NextLink>
    </Link>
  );
};

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogOutMutation();

  const onLogOut = async () => {
    await logout();
    setAccessToken('');
    await client!.resetStore();
  };

  return (
    <Stack
      spacing={8}
      align="center"
      justify="center"
      direction="row"
      pt={[4, 4, 0, 0]}
      w="100%"
      h={12}
      position="fixed"
      top="0"
      borderBottomWidth={1}
      borderBottomColor="grey.200"
    >
      <MenuItem to="/">Home</MenuItem>
      <MenuItem to="/signup">Sign Up</MenuItem>
      <MenuItem to="/login">Login</MenuItem>
      <Link>{!loading && data && data.me && <Button onClick={onLogOut}>Logout</Button>}</Link>
      <Text>You are logged in as: {data && data.me ? data.me.email : 'guest'}</Text>
    </Stack>
  );
};
