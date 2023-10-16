//style
import styled from 'styled-components';

//components
import Interest from '@components/interest/Interest';

interface Props {}

/** 2023/07/14 - 관심사등록 Page - by leekoby */
const InterestPage: React.FC<Props> = (): JSX.Element => {
  return (
    <InterestPageContainer>
      <Interest />
    </InterestPageContainer>
  );
};

export default InterestPage;
const InterestPageContainer = styled.section`
  position: relative;
  margin: 0rem auto;
  width: 100%;
  height: 100%;
`;
