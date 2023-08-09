import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { MyInfoType } from 'types/api/myinfo';
import { useMutation } from '@tanstack/react-query';
import { patchProfileImg, postProfileImg } from '@api/myinfo';

// components
import TopHistoryBackNav from '@components/TopHistoryBackNav';
import Button from '@components/Button';
import CommonCategoryList from '@components/CommonCategoryList';

/**  2023/08/07 - 프로필 수정 페이지 - by sineTlsl */
const ProfileUpdatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const memberInfo: MyInfoType = location.state.data;
  const [profileImg, setProfileImg] = useState<string>(memberInfo.profileUrl);
  const profileImgInput = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState<string[]>([]);

  /** 2023/08/07 - 이미지 업데이트 함수 생성 - by sineTlsl */
  const mutation = useMutation(patchProfileImg, {
    onSuccess: data => {
      // 성공 시 업로드된 이미지 URL 설정
      setProfileImg(data.imageUrl);
    },
    onError: err => console.log(err),
  });

  /** 2023/08/07 - 이전 페이지 이동 함수 - by sineTlsl */
  const goBackPage = () => {
    navigate('/myinfo');
  };

  /** 2023/08/07 - 이미지 선택 대화상자 open - by sineTlsl */
  const handlerUpdateImg = () => {
    if (profileImgInput.current) {
      profileImgInput.current.click();
    }
  };

  /** 2023/08/07 - 프로필 이미지 선택 - by sineTlsl */
  const handlerChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadImgFile = e.target.files[0];
      const formData = new FormData();
      formData.append('file', uploadImgFile);

      // mutation을 사용하여 이미지 업로드 요청
      mutation.mutate(formData);
    }
  };

  /** 2023/08/07 - 프로필 이미지 제거 - by sineTlsl */
  const handlerRemoveImg = () => {
    setProfileImg('');
  };

  return (
    <ProfileUpdateContainer>
      <TopHistoryBackNav textTitle="프로필 수정" onNavigation={goBackPage} />
      <ProfileWrap>
        <ImgWrap>
          <img src={profileImg || '/assets/images/default-profile-image.png'} alt="프로필 이미지" />
          <div className="img-btn-wrap">
            <input
              type="file"
              accept="image/jpg, image/png, image/jpeg"
              name="profile-img"
              ref={profileImgInput}
              onChange={handlerChangeImg}
            />
            <button className="img-common-btn img-upload-btn" onClick={handlerUpdateImg}>
              이미지 업로드
            </button>
            <button className="img-common-btn img-delete-btn" onClick={handlerRemoveImg}>
              이미지 제거
            </button>
          </div>
        </ImgWrap>
        <InfoTextWrap>
          <div className="name-wrap">
            <p className="name-text">{memberInfo.displayName}</p>
          </div>
          <p className="email-text">{memberInfo.email}</p>
        </InfoTextWrap>
      </ProfileWrap>
      <CategoryWrap>
        <CommonCategoryList
          width="100%"
          category={category}
          handleCategory={() => console.log(`category submit => ${category}`)}
        />
      </CategoryWrap>
      <ProfileUpdateWrap>
        <Button onClick={() => console.log('헤헷 저장')}>저장</Button>
      </ProfileUpdateWrap>
    </ProfileUpdateContainer>
  );
};

export default ProfileUpdatePage;

const ProfileUpdateContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

// 프로필 업데이트 정보
const ProfileWrap = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  gap: 5rem;
`;

// 프로필 이미지
const ImgWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 50%;
  }

  > .img-btn-wrap {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  > .img-btn-wrap > input[type='file'] {
    display: none;
  }

  // 버튼 공통 속성
  > .img-btn-wrap > .img-common-btn {
    height: 3.3rem;
    padding: 0 1.7rem;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
  > .img-btn-wrap > .img-upload-btn {
    background: var(--color-sub);
    color: var(--color-light);
    &:hover {
      background: var(--color-main);
    }
  }
  > .img-btn-wrap > .img-delete-btn {
    background: none;
    color: var(--color-sub);
    &:hover {
      background-color: var(--color-light-gray);
    }
  }
`;

// 회원 닉네임 및 이메일 정보
const InfoTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;

  > .name-wrap {
    display: flex;
    color: var(--color-dark);
    font-size: 18px;
    font-weight: 700;
  }
  > .email-text {
    color: var(--color-dark-gray);
    font-weight: 400;
    font-size: 14px;
  }
`;

const CategoryWrap = styled.div`
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 2rem;
  height: 100%;
`;
// 회원정보 저장 버튼
const ProfileUpdateWrap = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  padding: 0 2rem;
`;
