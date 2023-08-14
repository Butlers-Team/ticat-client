import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { MyInfoType } from 'types/api/myinfo';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getInterest, patchMyInfo, patchInterest } from '@api/myinfo';

// util
import { CheckCategory } from '@utils/categories';

// components
import TopHistoryBackNav from '@components/TopHistoryBackNav';
import Button from '@components/Button';
import CommonCategoryList from '@components/CommonCategoryList';
import ProfileImageUpdate from '@components/profile/ProfileImageUpdate';
import ProfileInfoNameUpdate from '@components/profile/ProfileInfoNameUpdate';

/**  2023/08/07 - 프로필 수정 페이지 - by sineTlsl */
const ProfileUpdatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const memberInfo: MyInfoType = location.state.data;
  const [memberName, setMemberName] = useState(memberInfo.displayName);

  const { data } = useQuery(['userInterest'], getInterest);
  const [category, setCategory] = useState<string[]>([]);

  /** 2023/08/12 - 서버의 카테고리가 변경될 때, category 변수도 변경 - by sineTlsl */
  useEffect(() => {
    if (data && data.categories) {
      const categories = data.categories.map(interest => interest);
      setCategory(categories);
    }
  }, [data]);

  /** 2023/08/13 - 관심사 업데이트 요청 함수 생성 - by sineTlsl */
  const interestMutation = useMutation(patchInterest, {
    onError: err => {
      console.log(err);
    },
  });

  /** 2023/08/13 - 프로필 업데이트 요청 함수 생성 - by sineTlsl */
  const profileUpdatemutation = useMutation(patchMyInfo, {
    onSuccess: () => {
      navigate('/myinfo');
    },
    onError: err => {
      console.log(err);
    },
  });

  /** 2023/08/07 - 이전 페이지 이동 함수 - by sineTlsl */
  const goBackPage = () => {
    navigate('/myinfo');
  };

  /** 2023/08/12 - 관심사 카테고리 선택 이벤트 함수 - by sineTlsl */
  const handleCategory = (item: string) => {
    const maxLength = 5;
    setCategory(prev => CheckCategory(prev, item, maxLength));
  };

  /** 2023/08/13 - 프로필 업데이트 이벤트 함수 - by sineTlsl */
  const handleProfileUpdate = () => {
    const updateProfileBody = {
      displayName: memberName,
      password: '!a123123',
    };

    const updateInterestBody = {
      categories: category,
    };

    profileUpdatemutation.mutate(updateProfileBody);
    interestMutation.mutate(updateInterestBody);
  };

  return (
    <ProfileUpdateContainer>
      <TopBackNavWrap>
        <TopHistoryBackNav textTitle="프로필 수정" onNavigation={goBackPage} />
      </TopBackNavWrap>
      <ProfileMainWrap>
        <ProfileContentWrap>
          {data && (
            <ProfileWrap>
              <ProfileImageUpdate profileUrl={memberInfo.profileUrl} />
              <ProfileInfoNameUpdate memberName={memberName} setMemberName={setMemberName} email={memberInfo.email} />
            </ProfileWrap>
          )}
          <CategoryWrap>
            <CommonCategoryList width="100%" category={category} handleCategory={handleCategory} />
          </CategoryWrap>
        </ProfileContentWrap>
        <ProfileUpdateWrap>
          <Button onClick={handleProfileUpdate}>저장</Button>
        </ProfileUpdateWrap>
      </ProfileMainWrap>
    </ProfileUpdateContainer>
  );
};

export default ProfileUpdatePage;

const ProfileUpdateContainer = styled.section`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

// 상단 뒤로가기 고정
const TopBackNavWrap = styled.div`
  width: 100%;
  height: 5rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 200;
`;

const ProfileMainWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 5rem);
  padding: 0 2rem;
  overflow-y: auto;
`;

// 프로필 콘텐츠 컨테이너
const ProfileContentWrap = styled.div`
  width: 100%;
  height: 100%;
`;

// 프로필 업데이트 정보
const ProfileWrap = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4rem;
`;

const CategoryWrap = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// 회원정보 저장 버튼
const ProfileUpdateWrap = styled.div`
  margin-top: 2rem;
  width: 100%;
`;
