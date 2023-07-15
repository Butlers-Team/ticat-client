import { ApiSignInRequest, ApiSignInSuccess } from 'types/auth';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OauthButton from './OauthButton';
import { useSignIn } from '@hooks/query/index';
import { useTokenStore } from '@store/authStore';

interface ButtonProps {
  buttonType: 'signin' | 'signup';
}
/** 2023/06/29 - 로그인 컴포넌트 - by leekoby */
const SignIn: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const signInMutation = useSignIn();

  // input 입력값 state 변경 함수
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    const { name, value } = event.target;

    if (name === 'userId') {
      setUserId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }, []);
  // 로그인 버튼 클릭 핸들러
  const handleSignin: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    // TODO: 로그인 요청 처리

    const loginData: ApiSignInRequest = {
      id: userId,
      password,
    };

    // 로그인 요청 처리 시작
    signInMutation.mutate(loginData);
  };

  // 카카오 Oauth 요청 함수
  const handleKakaoClick = () => {
    // TODO: Kakao 요청 처리
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
  };

  // 네이버 Oauth 요청 함수
  const handleNaverClick = () => {
    // TODO: Naver 요청 처리
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/naver`;
  };

  // 구글 Oauth 요청 함수
  const handleGoogleClick = () => {
    // TODO: Google 요청 처리
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
  };

  return (
    <SignInContainer>
      <Title>로그인</Title>
      <form onSubmit={handleSignin}>
        <InputContainer>
          <InputBox placeholder="아이디" name="userId" value={userId} onChange={handleChange} />
          <InputBox placeholder="비밀번호" type="password" name="password" value={password} onChange={handleChange} />
        </InputContainer>
        <ButtonContainer>
          <StyledButton buttonType="signin" type="submit">
            로그인
          </StyledButton>
        </ButtonContainer>
      </form>
      <Link to="/signup">
        <ButtonContainer>
          <StyledButton buttonType="signup">회원가입</StyledButton>
        </ButtonContainer>
      </Link>

      <OauthButtonContainer>
        <OauthButton buttonService="kakao" onClick={handleKakaoClick}>
          카카오 로그인
        </OauthButton>
        <OauthButton buttonService="naver" onClick={handleNaverClick}>
          네이버 로그인
        </OauthButton>
        <OauthButton buttonService="google" onClick={handleGoogleClick}>
          구글 로그인
        </OauthButton>
      </OauthButtonContainer>
    </SignInContainer>
  );
};

export default SignIn;

/** 2023/06/29 - 로그인 컨테이너 - by leekoby */
const SignInContainer = styled.div`
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  animation: showupLayout 0.5s forwards;
  .contents-box {
    padding: 20px;
    > h2 {
      font-size: 18px;
      font-weight: 700;
    }
    > div {
      margin: 20px 0px;
    }
  }

  @keyframes showupLayout {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 1;
      transform: translateY(-40px);
    }
    100% {
      opacity: 1;
      transform: translateY(-30px);
    }
  }
`;

/** 2023/06/29 - 로그인 타이틀 - by leekoby */
const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  color: var(--color-main);
  margin-bottom: 3rem;
`;

/** 2023/06/29 - 로그인 인풋창 컨테이너 - by leekoby */
const InputContainer = styled.div`
  display: inline-block;
  margin: 0 auto;
  width: 270px;
  align-content: center;
  text-align: center;
`;

/** 2023/06/29 - 로그인 인풋창 컴포넌트 - by leekoby */
const InputBox = styled.input`
  width: 100%;
  height: 45px;
  margin-bottom: 9px;
  padding: 2px 5px;
  border: 1px solid #a5a5a5;
  border-radius: 12px;

  ::placeholder {
    color: rgba(130, 129, 129, 0.6);
  }
  &:focus {
    outline: none;
    border: 2px solid var(--color-sub);
    ::placeholder {
      opacity: 0;
    }
  }
`;

/** 2023/06/29 - 버튼 컨테이너 - by leekoby */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  flex-direction: column;
  margin: 5px auto;
  width: 270px;
`;

/** 2023/06/29 - Oauth 버튼 컨테이너 - by leekoby */
const OauthButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  flex-direction: column;
  margin-top: 30px;
  width: 270px;
`;

/** 2023/06/29 - 로컬 로그인/회원가입 버튼  - by leekoby */
const StyledButton = styled.button<ButtonProps>`
  font-size: 14px;
  font-weight: bold;
  height: 45px;
  border: 1px solid
    ${({ buttonType }) => {
      switch (buttonType) {
        case 'signin':
          return `var(--color-sub)`;
        case 'signup':
          return `#a5a5a5`;
      }
    }};

  margin-bottom: 5px;
  border-radius: 12px;

  background-color: ${props => (props.buttonType === 'signin' ? 'var(--color-sub)' : 'var(--background-color)')};
  color: ${props => (props.buttonType === 'signin' ? `white` : `var(--color-dark)`)};

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
