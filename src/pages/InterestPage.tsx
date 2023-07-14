import Interest from '@components/interest/Interest';
import { useTokenStore } from '@store/authStore';

interface Props {}

/** 2023/07/14 - 관심사등록 Page - by leekoby */
const InterestPage: React.FC<Props> = (props): JSX.Element => {
  const { accessToken, refreshToken } = useTokenStore();
  return <>{accessToken && refreshToken && <Interest />}</>;
};

export default InterestPage;
