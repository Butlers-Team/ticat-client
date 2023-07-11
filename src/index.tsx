import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from '@styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { ChakraProvider } from '@chakra-ui/react';

//React Query를 여기다가 설정
//리액트 쿼리의 핵심 클래스 : 쿼리랑 뮤테이션 같은 것들을 관리하고 캐시해서 받아옴/
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <App />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
