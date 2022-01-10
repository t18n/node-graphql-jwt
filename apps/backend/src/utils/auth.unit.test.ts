import { User } from '../entity/User/User';
import { createAccessToken } from './auth';
import jwtDecode from 'jwt-decode';
import { verify } from 'jsonwebtoken';

const user = new User();
user.email = 'example@gmail.com';
user.password = 'Secret123';

describe('auth', () => {
  test('accessToken should expire in 15s and should be verified with the TOKEN_SECRET', async () => {
    const tokenCreateTime = Date.now();
    const accessToken = createAccessToken(user);
    const { exp } = jwtDecode<any>(accessToken);

    const validTime = exp * 1000 - tokenCreateTime;

    // If the token is exp between 14-15s, it should be good
    // TODO: Manouver time to test properly
    expect(validTime).toBeGreaterThanOrEqual(14 * 1000);
    expect(validTime).toBeLessThan(15 * 1000);

    const payload: any = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    expect(payload.exp).toEqual(exp);
  });
});
