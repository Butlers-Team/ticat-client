import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// components
import TopHistoryBackNav from '@components/TopHistoryBackNav';
import MySetting from '@components/mysetting/MySetting';

/** 2023/07/21 - 설정 페이지 - by sineTlsl */
const SettingPage = () => {
  const navigate = useNavigate();

  /** 2023/07/21 - 이전 페이지 이동 함수 - by sineTlsl */
  const goBackPage = () => {
    navigate('/myinfo');
  };

  return (
    <SettingContainer>
      <TopHistoryBackNav textTitle="설정 관리" onNavigation={goBackPage} />
      <MySetting />
    </SettingContainer>
  );
};

export default SettingPage;

const SettingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
