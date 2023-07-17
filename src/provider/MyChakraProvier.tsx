import { ChakraProvider } from '@chakra-ui/react';
/** 2023/07/10 - chakra-ui provider 컴포넌트  - by leekoby */
const MyChakraProvier: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ChakraProvider resetCSS={false}>{children}</ChakraProvider>;
};

export default MyChakraProvier;
