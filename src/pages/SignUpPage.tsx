import SignUp from '@components/signup/SignUp';
import styled from 'styled-components';

/** 2023/06/29 - 회원가입 페이지 - by leekoby */
const SignUpPage: React.FC = (): JSX.Element => {
  return (
    <SignUpPageContainer>
      <SignUp />;
    </SignUpPageContainer>
  );
};

export default SignUpPage;
const SignUpPageContainer = styled.section`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;
