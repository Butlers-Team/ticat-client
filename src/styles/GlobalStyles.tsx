import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`

:root {
  /* Color */
  --color-main: rgba(43,136,246,1);
  --color-sub: rgba(24, 164, 251, 1);
  --color-dark-text: rgba(53, 53, 53, 1); 
  --color-light-text: rgba(220,220,220,1); 
  --background-color: rgba(255,255,255,1); 
}


${reset}
	// 아래에 전역 스타일을 추가
    *{
        box-sizing: border-box;
    }
    a{
        text-decoration: none;
        color: inherit;
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
        font-family: 'Noto Sans KR', sans-serif;
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


	`;

export default GlobalStyles;
