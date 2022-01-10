import React, { useEffect, useState } from 'react';
import { Routes } from '../Routes';
import { setAccessToken } from '../configs/accessToken';
import { Layout } from '../components/Layout';
import { CircularProgress } from '@node-graphql-jwt/ui';

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URI}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <CircularProgress isIndeterminate color="green.300" />;
  }

  return <Routes />;
};
