import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`

:root {
  /* Color */
  --color-main: rgba(43,136,246,1);
  --color-sub: rgba(24, 164, 251, 1);
  --color-dark-text: rgba(53, 53, 53, 1); 
  --color-light-text: rgba(240,240,240,1); 
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
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    max-width: 50rem;
    margin: 0 auto;
    height: 100vh;
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
    padding: 0 0 0 1.5em;
  }
  li {
    padding: 0;
  }
  b { 
    margin-right: 3px;
  }

  .app {
    height: 100vh;
    width: 100%;
    background-color: #fff;
  }

  main {
    width: 100%;
    height: calc(100vh - 70px);
    overflow-x: hidden;
  
  }

  nav {
    border-top: 1px solid #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
  }


`;

export default GlobalStyles;
