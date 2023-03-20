import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/templates/Login';
import loginSlice from '../slice/loginSlice';

describe('Login.tsx', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        login: loginSlice,
      },
    });
  });

  //
  it('should be loginButton disabled', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should be loginButton actived', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    //メールアドレス入力
    const mailAddress = screen.getAllByRole('textbox')[0] as HTMLInputElement;
    await userEvent.type(mailAddress, 'testLoginMailAddress');
    expect(mailAddress.value).toBe('testLoginMailAddress');

    //ログインボタン非活性確認
    expect(screen.getByRole('button')).toBeDisabled();

    //パスワード入力
    const password: HTMLInputElement = screen.getByTestId('loginPassword');
    await userEvent.type(password, 'testLoginPassword');
    expect(password.value).toBe('testLoginPassword');

    //ログインボタン活性確認
    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('should change to Japanese', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    //英語モードであることを確認する
    const EnTitle = screen.getByRole('heading', { name: 'Login' });
    expect(EnTitle).toBeTruthy();

    //日本語モードへの変更をクリック
    fireEvent.click(screen.getByText('日本語'));

    //日本語モードになっているか確認する。
    const JaTitle = screen.getByRole('heading', { name: 'ログイン' });
    expect(JaTitle).toBeTruthy();
  });
});
