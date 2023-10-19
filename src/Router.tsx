import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@layout/index';

// Pages
import CalendarPage from '@pages/CalendarPage';
import StampCheck from '@pages/StampValidPage';
import StampList from '@pages/StampListPage';
import MainPage from '@pages/MainPage';
import FestivalListPage from '@pages/FestivalListPage';
import AreaFilterPage from '@pages/AreaFilterPage';
import DetailPage from '@pages/DetailPage';
import SignUpPage from '@pages/SignUpPage';
import SignInPage from '@pages/SignInPage';
import WellcomePage from '@pages/WellcomePage';
import OauthCallbackPage from '@pages/OauthCallbackPage';
import InterestPage from '@pages/InterestPage';
import MapListPage from '@pages/MapListPage';
import MyPage from '@pages/MyPage';
import MyInfoSettingPage from '@pages/SettingPage';
import ProfileUpdatePage from '@pages/ProfileUpdatePage';

import { useMemberStore } from '@store/useMemberStore';
import { useTokenStore } from '@store/useTokenStore';

const Router = () => {
  /** 2023/08/15- 접근 보안 추가 - by leekoby */
  const { member } = useMemberStore();
  const { accessToken, refreshToken } = useTokenStore();
  const isAuthenticated = !!accessToken && !!refreshToken && !!member;
  const isAuthenticatedWithInterest = isAuthenticated && member.interest;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/maplist" element={<MapListPage />} />
        <Route path="/festival" element={<FestivalListPage />} />
        <Route path="/festival/area" element={<AreaFilterPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/callback/:interest" element={<OauthCallbackPage />} />

        {/* 로그인 되어있을때 접근 안되게 */}
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <SignInPage />} />
        <Route path="/wellcome" element={isAuthenticated ? <Navigate to="/" /> : <WellcomePage />} />

        {/* 로그인 안되어 있을때 접근 안되게  */}
        <Route path="/calendar" element={isAuthenticated ? <CalendarPage /> : <Navigate to="/signin" />} />
        <Route path="/stamp/valid" element={isAuthenticated ? <StampCheck /> : <Navigate to="/signin" />} />
        <Route path="/stamp/list" element={isAuthenticated ? <StampList /> : <Navigate to="/signin" />} />
        <Route path="/myinfo" element={isAuthenticated ? <MyPage /> : <Navigate to="/signin" />} />
        <Route path="/setting" element={isAuthenticated ? <MyInfoSettingPage /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfileUpdatePage /> : <Navigate to="/signin" />} />

        {/* 로그인되어있고, displayName이 없을때 */}
        <Route path="/interest" element={isAuthenticatedWithInterest ? <Navigate to="/" /> : <InterestPage />} />

        <Route path="*" element={<>404 not found</>} />
      </Routes>
    </Layout>
  );
};

export default Router;
