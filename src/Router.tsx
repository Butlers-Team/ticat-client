import { Route, Routes } from 'react-router-dom';
import Layout from '@layout/index';

// Pages
import StampCheck from '@pages/StampCheck';

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/stamp/check" element={<StampCheck />} />
      </Routes>
    </Layout>
  );
};

export default Router;
