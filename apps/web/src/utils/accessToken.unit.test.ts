import { getAccessToken } from './accessToken';
import { setAccessToken } from '../utils/accessToken';

describe('accessToken', () => {
  test('accessToken should be empty at the beginning', () => {
    const accessToken = getAccessToken();

    expect(accessToken).toEqual('');
  });

  test('accessToken should be set and get properly', () => {
    const testToken = 'test_token';
    setAccessToken(testToken);

    const accessToken = getAccessToken();

    expect(accessToken).toEqual(testToken);
  });
});
