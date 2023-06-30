import { Route, Routes } from 'react-router-dom';
import Layout from '@layout/index';

// Pages
import StampValid from '@pages/StampValid';
import CalendarPage from '@pages/CalendarPage';

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/stamp/valid" element={<StampValid />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Layout>
  );
};

export default Router;
