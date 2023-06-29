import TabNav from '@layout/tabNav';
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
