import { ReactNode } from 'react';

//css
import styled from 'styled-components';
import { OauthVariables } from '@styles/OauthColor';

//icon
import { RiKakaoTalkFill } from 'react-icons/ri';
// TODO: 카카오 Oauth 아이콘 수정해야함 글씨 없는 말풍선
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';

/** 2023/06/29 - ButtonService 타입 - by leekoby */
type ButtonService = 'kakao' | 'naver' | 'google';

interface Props {
  children: ReactNode;
  buttonService: ButtonService;
  onClick: () => void;
}

/** 2023/06/29 - Service에 따라 다른 버튼 가져오는 함수 - by leekoby */
const getIconByButtonService = (buttonService: ButtonService) => {
  switch (buttonService) {
    case 'kakao':
      return <RiKakaoTalkFill size={14} color={OauthVariables.colorKakaoSymbol} />;
    case 'naver':
      return <SiNaver size={14} />;
    case 'google':
      return <FcGoogle size={14} />;
    default:
      return null;
  }
};

/** 2023/06/29 - Oauth 버튼 컴포넌트 - by leekoby */
const OauthButton: React.FC<Props> = ({ children, buttonService, onClick }): JSX.Element => {
  return (
    <OauthBtn buttonService={buttonService} onClick={onClick}>
      <IconWrapper>{getIconByButtonService(buttonService)}</IconWrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </OauthBtn>
  );
};

export default OauthButton;

/** 2023/06/29 - Oauth 버튼 컴포넌트 스타일 - by leekoby */
const OauthBtn = styled.button<{ buttonService: ButtonService }>`
  ${OauthVariables}

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  height: 45px;
  border: 1px solid
    ${({ buttonService }) => {
      switch (buttonService) {
        case 'kakao':
          return `${OauthVariables.colorKakao}`;
        case 'naver':
          return `${OauthVariables.colorNaver}`;
        default:
          return `#a5a5a5`;
      }
    }};

  border-radius: 12px;
  margin-bottom: 5px;
  background-color: ${({ buttonService }) => {
    switch (buttonService) {
      case 'kakao':
        return `${OauthVariables.colorKakao}`;
      case 'naver':
        return `${OauthVariables.colorNaver}`;
      default:
        return `${OauthVariables.colorGoogle}`;
    }
  }};
  color: ${({ buttonService }) => {
    switch (buttonService) {
      case 'kakao':
        return `${OauthVariables.colorKakaoText}`;
      case 'naver':
        return `${OauthVariables.colorNaverText}`;
      default:
        return `${OauthVariables.colorGoogleText}`;
    }
  }};

  &:focus {
    outline: none;
    border: 2px solid var(--color-sub);
    ::placeholder {
      opacity: 0;
    }
  }
  &:hover {
    cursor: pointer;
  }
`;

/** 2023/06/29 - Oauth 아이콘 Wrapper - by leekoby */
const IconWrapper = styled.span`
  margin: 8px;
`;
/** 2023/06/29 - Oauth Children Wrapper - by leekoby */
const ChildrenWrapper = styled.span`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
