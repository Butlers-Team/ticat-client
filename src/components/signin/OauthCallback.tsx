//react
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

//store
import { useTokenStore } from '@store/useTokenStore';
import { useMemberStore } from '@store/useMemberStore';

interface Props {}

/** 2023/07/14 - OauthCallback Component - by leekoby */
const OauthCallback: React.FC<Props> = (): JSX.Element => {
  const { setMember } = useMemberStore();
  const { setAccessToken, setRefreshToken } = useTokenStore();
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 관심사 등록 여부
  const { interest } = useParams<{ interest: string }>();
  // interest의 값이 'true' 또는 'false'의 문자열로 전달됨.
  // 이는 무조건 true로 판정되기 떄문에 아래 hasInterest를 통해 올바른 Boolean값으로 변경해줌
  const hasInterest = interest === 'true';

  useEffect(() => {
    // URL 쿼리 매개변수 분석
    const queryParams = new URLSearchParams(location.search);
    // URL에서 Member 정보 값 얻기

    const profileUrl = queryParams.get('profileUrl');

    let displayName = null;

    const displayNameParam = queryParams.get('displayName');
    if (displayNameParam) {
      displayName = decodeURIComponent(displayNameParam);
      console.log('displayName:', displayName);
    }
    const memberId = queryParams.get('memberId');
    // URL에서 토큰 값 얻기
    const accessToken = queryParams.get('Authorization');
    const refreshToken = queryParams.get('Refresh');

    if (accessToken && refreshToken) {
      // 토큰 값 저장
      setAccessToken(accessToken);

      setRefreshToken(refreshToken);
      if (memberId) {
        setMember({
          profileUrl,
          displayName,
          memberId: +memberId,
        });
        // 페이지 리디렉션 (예:메인 페이지)
        if (hasInterest) {
          navigate('/');
        } else {
          navigate('/interest');
        }
      } else {
        console.error('정보 저장 실패.');
      }
    } else {
      console.error('인증 토큰이 누락되었습니다.');
    }
  }, [navigate, location, interest, setMember, setAccessToken, setRefreshToken]);
  return <div>Loading...</div>;
};

export default OauthCallback;
