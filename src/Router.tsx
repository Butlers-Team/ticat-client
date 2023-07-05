import { Route, Routes } from 'react-router-dom';
import Layout from '@layout/index';

// Pages
import StampCheck from '@pages/StampValid';
import StampList from '@pages/StampList';
import MainPage from '@pages/MainPage';
import SignUpPage from '@pages/SignUpPage';
import SignInPage from '@pages/SignInPage';

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/stamp/valid" element={<StampCheck />} />
        <Route path="/stamp/list" element={<StampList />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Layout>
  );
};

export default Router;
