import { useLocation } from 'react-router-dom';
import TabNav from '@layout/tab-nav';
import Main from '@layout/main';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const hidePages = ['/stamp/valid', '/stamp/list']; // 숨기고 싶은 페이지

  /** 2023/07/03 - 페이지를 숨기고 싶은 함수 - by sineTlsl */
  const shouldHide = () => hidePages.includes(location.pathname);

  return (
    <>
      <Main className={shouldHide() ? undefined : 'main_vh70'}>{children}</Main>
      {!shouldHide() && <TabNav />}
    </>
  );
};

export default Layout;
