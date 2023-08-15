import MyChakraProvier from '@provider/MyChakraProvier';
import MyReactQueryProvider from '@provider/MyReactQueryProvider';

/** 2023/07/10 - provider 컴포넌트 - by leekoby */
const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <MyChakraProvier>
      <MyReactQueryProvider>{children}</MyReactQueryProvider>
    </MyChakraProvier>
  );
};

export default Provider;
