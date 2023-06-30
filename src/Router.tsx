import { Route, Routes } from 'react-router-dom';
import Layout from '@layout/index';

// Pages
import StampCheck from '@pages/StampValid';

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/stamp/valid" element={<StampCheck />} />
      </Routes>
    </Layout>
  );
};

export default Router;
