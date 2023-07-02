import { Route, Routes } from 'react-router-dom';
import Layout from '@layout/index';

// Pages

import CalendarPage from '@pages/CalendarPage';
import StampCheck from '@pages/StampValid';
import StampList from '@pages/StampList';

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/stamp/valid" element={<StampCheck />} />
        <Route path="/stamp/list" element={<StampList />} />
      </Routes>
    </Layout>
  );
};

export default Router;
