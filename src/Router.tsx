import { Route, Routes } from 'react-router-dom';
import Layout from '@layout/index';

// Pages
import StampCheck from '@pages/StampValid';
import StampList from '@pages/StampList';

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/stamp/valid" element={<StampCheck />} />
        <Route path="/stamp/list" element={<StampList />} />
      </Routes>
    </Layout>
  );
};

export default Router;
