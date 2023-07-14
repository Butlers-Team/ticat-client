import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTokenStore } from '@store/authStore';

interface Props {}

const OauthCallback: React.FC<Props> = (): JSX.Element => {
  const { setAccessToken, setRefreshToken } = useTokenStore();
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 관심사 등록 여부
  const { interest } = useParams<{ interest: string }>();

  useEffect(() => {
    // URL 쿼리 매개변수 분석
    const queryParams = new URLSearchParams(location.search);

    // URL에서 토큰 값 얻기
    const accessToken = queryParams.get('Authorization');
    const refreshToken = queryParams.get('Refresh');

    if (accessToken && refreshToken) {
      // 토큰 값 저장
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // 페이지 리디렉션 (예:메인 페이지)
      if (interest) navigate('/');
      else navigate('/interest');
    } else {
      // 오류 처리
      console.error('인증 토큰이 URL에 누락되었습니다.');
    }
  }, [navigate, location, interest]);
  return <div>Loading...</div>;
};

export default OauthCallback;
