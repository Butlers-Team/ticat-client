import styled from 'styled-components';
import { useCallback, useState } from 'react';
import SignInputForm from './SignupInputForm';
import Button from '@components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '@hooks/query';
import { ApiSignUpRequest } from 'types/auth';

/** 2023/06/29 - 회원가입 컴포넌트 - by leekoby */
const SignUp: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  // 이름, 이메일, 비밀번호, 비밀번호 확인
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //오류메시지 상태저장
  const [idMessage, setIdMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setConfirmPasswordMessage] = useState<string>('');

  // 유효성 검사
  const [isId, setIsId] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsConfirmPassword] = useState<boolean>(false);

  // 비밀번호 show state
  const [showPassword, setShowPassword] = useState(false);

  // 비밀번호 입력 show
  const toggleShowPassword: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();
    setShowPassword(!showPassword);
  };

  // 회원가입 버튼 클릭 핸들러
  const handleSignUp: React.FormEventHandler<HTMLFormElement> = async event => {
    console.log('------submit------');
    event.preventDefault();

    const signUpData: ApiSignUpRequest = {
      id: userId,
      email,
      password,
      confirmPassword,
    };

    console.log(signUpData);
    signUpMutation.mutate(signUpData);
  };

  // 이름
  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    if (e.target.value.length < 6 || e.target.value.length >= 10) {
      setIdMessage('6글자 이상 10글자 미만으로 입력해주세요.');
      setIsId(false);
    } else {
      setIdMessage('올바른 이름 형식이에요 : )');
      setIsId(true);
    }
  }, []);

  // 이메일
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ');
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이메일 형식이에요 : )');
      setIsEmail(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상!');
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )');
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const confirmPasswordCurrent = e.target.value;
      setConfirmPassword(confirmPasswordCurrent);

      if (password === confirmPasswordCurrent) {
        setConfirmPasswordMessage('비밀번호를 똑같이 입력했어요 : )');
        setIsConfirmPassword(true);
      } else {
        setConfirmPasswordMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ');
        setIsConfirmPassword(false);
      }
    },
    [password],
  );

  return (
    <SignUpContainer>
      <Title>회원가입</Title>
      <FormContainer onSubmit={handleSignUp}>
        <InputContainer>
          {/* 아이디 */}
          <SignInputForm
            label="아이디"
            placeholder="6글자 이상 10글자 미만으로 입력해주세요."
            type="id"
            name="userId"
            value={userId}
            onChange={onChangeId}
            onClear={() => {
              setUserId('');
              setIsId(false);
            }}
            isValid={isId}
            validMessage={idMessage}
          />
          {/* 이메일 */}
          <SignInputForm
            label="이메일"
            placeholder="이메일@exaple.com"
            type="email"
            name="userEmail"
            value={email}
            onChange={onChangeEmail}
            onClear={() => {
              setEmail('');
              setIsEmail(false);
            }}
            isValid={isEmail}
            validMessage={emailMessage}
          />

          {/* 비밀번호 */}
          <SignInputForm
            label="비밀번호"
            type="password"
            placeholder="숫자+영문자+특수문자 조합으로 8자리 이상"
            name="password"
            value={password}
            onChange={onChangePassword}
            onClear={() => {
              setPassword('');
              setIsPassword(false);
            }}
            isShow={showPassword}
            onToggleShow={toggleShowPassword}
            isValid={isPassword}
            validMessage={passwordMessage}
          />

          {/* 비밀번호확인 */}
          <SignInputForm
            label="비밀번호 확인"
            type="password"
            placeholder="숫자+영문자+특수문자 조합으로 8자리 이상"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangePasswordConfirm}
            onClear={() => {
              setConfirmPassword('');
              setIsConfirmPassword(false);
            }}
            isShow={showPassword}
            isValid={isPasswordConfirm}
            validMessage={passwordConfirmMessage}
          />
        </InputContainer>

        {/* 아이디, 이메일, 패스워드, 패스워드 확인이 다 맞다면 main 색상 버튼으로 */}

        <ButtonContainer>
          <Button type="submit" fontSize="1.6rem" disabled={!(isId && isEmail && isPassword && isPasswordConfirm)}>
            회원가입
          </Button>
        </ButtonContainer>
      </FormContainer>
    </SignUpContainer>
  );
};

export default SignUp;

/** 2023/06/29 - 회원가입 컨테이너 - by leekoby */
const SignUpContainer = styled.section`
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

const FormContainer = styled.form`
  position: relative;
`;

/** 2023/06/29 - 회원가입 타이틀 - by leekoby */
const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  color: var(--color-main);
  margin-bottom: 3rem;
`;

/** 2023/06/29 - 회원가입 인풋창 컨테이너 - by leekoby */
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 270px;
`;

/** 2023/06/29 - 버튼 컨테이너 - by leekoby */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  flex-direction: column;
  margin: 1rem auto;
  width: 270px;
`;
