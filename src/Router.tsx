import { Route, Routes } from 'react-router-dom';
import Layout from '@layout/index';

// Pages

import CalendarPage from '@pages/CalendarPage';
import StampCheck from '@pages/StampValid';
import StampList from '@pages/StampList';
import MainPage from '@pages/MainPage';
import DetailPage from '@pages/DetailPage';

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/stamp/valid" element={<StampCheck />} />
        <Route path="/stamp/list" element={<StampList />} />
      </Routes>
    </Layout>
  );
};

export default Router;
