import { Box, Center, Table, Tbody, Td, Th, Thead, Tr } from '@node-graphql-jwt/ui';
import React from 'react';
import { Layout } from '../components/Layout';
import { useUsersQuery } from '../generated/graphql';

interface Props {}

export const Home: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useUsersQuery({ fetchPolicy: 'network-only' });

  if (!data || loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Layout>
      <Box w={300}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Center>All users</Center>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.users.map((item) => (
              <Tr key={item.id}>
                <Td>
                  {' '}
                  <Center>{item.email}</Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Layout>
  );
};
