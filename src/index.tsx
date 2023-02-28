import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HomeRoutes } from './routes/HomeRoutes';
import Page404 from './components/page404/Page404';
import HeaderLayout from './components/header/HeaderLayout';
import LoginPageLayout from './features/auth/components/pages/LoginPageLayout';
import Banner from './components/banner/Banner';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPageLayout />} />
          {HomeRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<HeaderLayout>{route.children}</HeaderLayout>}
            />
          ))}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
      {/* バナー */}
      <Banner />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
