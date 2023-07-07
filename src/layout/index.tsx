import { useLocation } from 'react-router-dom';
import TabNav from '@layout/tab-nav';
import Main from '@layout/main';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const hidePages = ['/stamp/valid', '/stamp/list', '/signup', '/signin', '/wellcome']; // navBar를 숨기고 싶은 페이지

  /** 2023/07/03 - 현재 페이지의 경로가 hidePages에 포함되어 있는지 확인하는 함수 - by sineTlsl */
  const shouldHide = () => hidePages.includes(location.pathname);

  return (
    <>
      <Main className={shouldHide() ? undefined : 'main-vh70'}>{children}</Main>
      {!shouldHide() && <TabNav />}
    </>
  );
};

export default Layout;
