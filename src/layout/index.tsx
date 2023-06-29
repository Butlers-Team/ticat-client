import TabNav from '@layout/tab-nav';
import Main from '@layout/main';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Main>{children}</Main>
      <TabNav />
    </>
  );
};

export default Layout;
