//react
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//style
import styled from 'styled-components';

//type
import { ApiSignInRequest } from 'types/auth';

//components
import OauthButton from '@components/signin/OauthButton';

//hooks
import { useSignIn } from '@hooks/query/index';

interface ButtonProps {
  buttontype: 'signin' | 'signup';
}

/** 2023/06/29 - 로그인 컴포넌트 - by leekoby */
const SignIn: React.FC = (): JSX.Element => {
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

    // 아이디 비밀번호가 입력되지 않았을때 요청 보내지 않기
    if (userId.length < 6 || userId.length >= 10) return;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) return;

    const loginData: ApiSignInRequest = {
      id: userId,
      password,
    };

    // 로그인 요청 처리 시작
    signInMutation.mutate(loginData);
  };

  // 카카오 Oauth 요청 함수
  const handleKakaoClick = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
  };

  // 네이버 Oauth 요청 함수
  const handleNaverClick = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/naver`;
  };

  // 구글 Oauth 요청 함수
  const handleGoogleClick = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
  };

  return (
    <SignInContainer>
      <Title>로그인</Title>
      <FormContainer onSubmit={handleSignin}>
        <InputContainer>
          <InputBox placeholder="아이디" name="userId" value={userId} onChange={handleChange} />
          <InputBox placeholder="비밀번호" type="password" name="password" value={password} onChange={handleChange} />
        </InputContainer>
        <ButtonContainer>
          <StyledButton buttontype={'signin'} type="submit">
            로그인
          </StyledButton>
        </ButtonContainer>
      </FormContainer>
      <Link to="/signup">
        <ButtonContainer>
          <StyledButton buttontype={'signup'}>회원가입</StyledButton>
        </ButtonContainer>
      </Link>

      <OauthButtonContainer>
        <OauthButton buttonservice={'kakao'} onClick={handleKakaoClick}>
          카카오 로그인
        </OauthButton>
        <OauthButton buttonservice={'naver'} onClick={handleNaverClick}>
          네이버 로그인
        </OauthButton>
        <OauthButton buttonservice={'google'} onClick={handleGoogleClick}>
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
  width: 90%;
  max-width: 33rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  a {
    width: 100%;
  }
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
  width: 100%;
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
const FormContainer = styled.form`
  width: 100%;
`;
/** 2023/06/29 - 버튼 컨테이너 - by leekoby */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  flex-direction: column;
  margin: 5px auto;
  width: 100%;
`;

/** 2023/06/29 - Oauth 버튼 컨테이너 - by leekoby */
const OauthButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
`;

/** 2023/06/29 - 로컬 로그인/회원가입 버튼  - by leekoby */
const StyledButton = styled.button<ButtonProps>`
  font-size: 14px;
  font-weight: bold;
  height: 45px;
  border: 1px solid
    ${({ buttontype }) => {
      switch (buttontype) {
        case 'signin':
          return `var(--color-sub)`;
        case 'signup':
          return `#a5a5a5`;
      }
    }};

  margin-bottom: 5px;
  border-radius: 12px;

  background-color: ${props => (props.buttontype === 'signin' ? 'var(--color-sub)' : 'var(--background-color)')};
  color: ${props => (props.buttontype === 'signin' ? `white` : `var(--color-dark)`)};

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
