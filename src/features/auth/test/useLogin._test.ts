import { act, renderHook } from '@testing-library/react';
import { useLogin } from '../hooks/useLogin';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Navigatorモック準備
const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

const server = setupServer(
  rest.get('http://localhost:8080/api/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        request: { status: 200 },
        headers: { 'x-auth-token': 'testToken' },
      })
    );
  }),
  rest.get('http://localhost:8080/api/user/getUserInfo', (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe('useLogin.test.ts', () => {
  it('should Login', () => {
    const { result } = renderHook(() => useLogin());
    act(() => {
      result.current.login(0);
    });
  });
  // expect()
  // expect(mockedNavigator).toHaveBeenCalledWith('tasks');
});
