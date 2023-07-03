import styled from 'styled-components';
import { useRef, useState } from 'react';
import SignInput from './SignupInput';
import Button from '@components/Button';

/** 2023/06/29 - 회원가입 컴포넌트 - by leekoby */
const SignUp: React.FC = (props): JSX.Element => {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 비밀번호 show state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 비밀번호 입력 show
  const toggleShowPassword = () => {
    event?.stopPropagation();
    setShowPassword(!showPassword);
  };

  // 비밀번호 확인 입력 show
  const toggleShowConfirmPassword = () => {
    event?.stopPropagation();
    setShowConfirmPassword(!showConfirmPassword);
  };

  // input 입력값 state 변경 함수
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { name, value } = event.target;

    if (name === 'userId') {
      setUserId(value);
    } else if (name === 'userEmail') {
      setUserEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  // 회원가입 버튼 클릭 핸들러
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    console.log('UserId:', userId);
    console.log('Email', userEmail);
    console.log('Password:', password);
    console.log('ConfirmPassword:', confirmPassword);

    // TODO: 회원가입 요청 처리
  };

  return (
    <SignUpContainer>
      <Title>회원가입</Title>
      <FormContainer onSubmit={handleSubmit}>
        <InputContainer>
          {/* 아이디 */}
          <SignInput
            type="text"
            placeholder="아이디"
            name="userId"
            value={userId}
            onChange={handleChange}
            onClear={() => setUserId('')}
            isShow={showPassword}
          />
          {/* 이메일 */}
          <SignInput
            type="text"
            placeholder="이메일"
            name="userEmail"
            value={userEmail}
            onChange={handleChange}
            onClear={() => setUserEmail('')}
            isShow={showPassword}
          />

          {/* 비밀번호 */}
          <SignInput
            type="password"
            placeholder="비밀번호"
            name="password"
            value={password}
            onChange={handleChange}
            onClear={() => setPassword('')}
            isShow={showPassword}
            onToggleShow={toggleShowPassword}
          />

          {/* 비밀번호확인 */}
          <SignInput
            type="password"
            placeholder="비밀번호 확인"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            onClear={() => setConfirmPassword('')}
            isShow={showPassword}
          />
        </InputContainer>

        <ButtonContainer>
          <Button type="submit" fontSize="1.6rem">
            회원가입
          </Button>
        </ButtonContainer>
      </FormContainer>
    </SignUpContainer>
  );
};

export default SignUp;

/** 2023/06/29 - 회원가입 컨테이너 - by leekoby */
const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormContainer = styled.form`
  border-radius: 25px;
  position: relative;
`;

/** 2023/06/29 - 회원가입 타이틀 - by leekoby */
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: var(--color-main);
  margin-top: 115px;
  margin-bottom: 30px;
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
  margin: 5px auto;
  width: 270px;
`;
