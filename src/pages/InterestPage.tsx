import Interest from '@components/interest/Interest';
import styled from 'styled-components';

interface Props {}

/** 2023/07/14 - 관심사등록 Page - by leekoby */
const InterestPage: React.FC<Props> = (props): JSX.Element => {
  return (
    <InterestPageContainer>
      <Interest />
    </InterestPageContainer>
  );
};

export default InterestPage;
const InterestPageContainer = styled.section`
  position: relative;
  margin: 2rem auto;
  width: 100%;
  height: 100%;
`;
