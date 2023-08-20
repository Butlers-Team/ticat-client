//style
import styled from 'styled-components';

//components
import SignIn from '@components/signin/SignIn';

/** 2023/06/29 - 로그인 페이지 - by leekoby */
const SignInPage: React.FC = (props): JSX.Element => {
  return (
    <SignInPageContainer>
      <SignIn />;
    </SignInPageContainer>
  );
};

export default SignInPage;
const SignInPageContainer = styled.section`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;
