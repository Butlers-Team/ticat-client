import { useLocation, Link } from 'react-router-dom';
import TabNav from '@layout/tab-nav';
import Main from '@layout/main';
import Provider from '../provider';
import styled from 'styled-components';
import { useState } from 'react';

// import
import Button from '@components/Button';
import Popup from '@components/Popup';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const hidePages = ['/stamp/valid', '/stamp/list', '/signup', '/signIn', '/wellcome']; // navBar를 숨기고 싶은 페이지

  /** 2023/07/03 - 현재 페이지의 경로가 hidePages에 포함되어 있는지 확인하는 함수 - by sineTlsl */
  const shouldHide = () => hidePages.includes(location.pathname);

  //pop-up 삭제
  const [displayNone, setdisplayNone] = useState<boolean>(false);

  setTimeout(() => {
    setdisplayNone(true);
  }, 11000);

  return (
    <>
      <Provider>
        <Main className={shouldHide() ? undefined : 'main-vh70'}>{children}</Main>
      </Provider>
      {!shouldHide() && <TabNav />}
      {displayNone ? null : (
        <PopupContainer>
          <Popup closetime={10000} time="10s" barcolor="var(--color-main)">
            <p className="modal-text">
              로그인을 진행하고 <br />
              맞춤 축제를 추천받으세요!
            </p>
            <Link to="/signin">
              <Button height="40px" width="100px" fontSize="1.3rem">
                로그인하기
              </Button>
            </Link>
          </Popup>
        </PopupContainer>
      )}
    </>
  );
};

export default Layout;

const PopupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 90px;
  z-index: 3;
  width: 100%;
`;
