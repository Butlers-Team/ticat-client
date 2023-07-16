import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`

:root {
  /* Color */
  --color-main: rgba(43,136,246,1);
  --color-sub: rgba(24, 164, 251, 1);
  --color-dark: rgba(53, 53, 53, 1); 
  --color-dark-gray: rgba(173, 173, 173, 1);
  --color-light-gray: rgba(230,230,230,1); 
  --color-light: rgba(250,250,250,1);
  --background-color: rgba(255,255,255,1); 
}

${reset}
	// 아래에 전역 스타일을 추가
  *{
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    user-select: none; // 유저가 더블클릭 등을 이용하여 글자를 선택하는 것을 막을 수 있음
    -webkit-tap-highlight-color:rgba(255,255,255,0); // 버튼 클릭 시 나오는 음영 지우기
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  html {
    background-color: #f6f6f6;
    font-size: 62.5%;
  }
  html, body, #root {
    height: 100%;
  }
  html,
  body,
  body > div { /* the react root */
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    font-family: 'Noto Sans KR','Noto Sans'; 
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    max-width: 50rem;
    margin: 0 auto;
    overflow-y: scroll;
  }
  #root {
    display: flex;
  }
  h2 {
    margin: 0;
    font-size: 16px;
  }
  ul {
    margin: 0;
    padding: 0 0 0 0;
  }
  li {
    padding: 0;
  }
  b { 
    margin-right: 3px;
  }

  .app {
    position: relative;
    background-color: #fff;
    width: 100%;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    overflow: hidden;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  main {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .main-vh70 {
    height: calc(100% - 70px);
  }
  

  nav {
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    position: relative;
  }


  .chakra-portal{
    width: 0;
    height:0;
  }

  
  //수평,수직 중앙정렬
  .flex-all-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  //수평 중앙정렬
  .flex-v-center{
    display: flex;
    justify-content: center;
  }

  //수직 중앙정렬 
  .flex-h-center{
    display: flex;
    align-items: center;
  }

  .column {
    flex-direction: column;
  }

  .row {
    flex-direction: row;
  }
`;

export default GlobalStyles;
