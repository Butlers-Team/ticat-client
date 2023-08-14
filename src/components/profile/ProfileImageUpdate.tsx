import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { deleteProfileImg, patchProfileImg } from '@api/myinfo';

interface ProfileImageProps {
  profileUrl: string;
}

/** 2023/08/12 - 프로필 이미지 업데이트 컴포넌트 - by sineTlsl */
const ProfileImageUpdate = ({ profileUrl }: ProfileImageProps) => {
  const [profileImg, setProfileImg] = useState<string>(profileUrl);
  const profileImgInput = useRef<HTMLInputElement>(null);

  /** 2023/08/07 - 이미지 수정 함수 생성 - by sineTlsl */
  const patchimageMutation = useMutation(patchProfileImg, {
    onSuccess: data => {
      // 성공 시 업로드된 이미지 URL 설정
      setProfileImg(data.profileUrl);
    },
    onError: err => {
      console.log(err);
    },
  });

  /** 2023/08/13 - 이미지 삭제 함수 생성 - by sineTlsl */
  const deleteImageMutation = useMutation(deleteProfileImg, {
    onError: err => {
      console.log(err);
    },
  });

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
      formData.append('image', uploadImgFile);

      console.log(formData);

      // mutation을 사용하여 이미지 업로드 요청
      patchimageMutation.mutate(formData);
    }
  };

  /** 2023/08/07 - 프로필 이미지 제거 - by sineTlsl */
  const handlerRemoveImg = () => {
    setProfileImg('');
    deleteImageMutation.mutate();
  };

  return (
    <ProfileImageContainer>
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
    </ProfileImageContainer>
  );
};

export default ProfileImageUpdate;

// 회원 프로필 이미지
const ProfileImageContainer = styled.div`
  width: 40%;
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
    &:active {
      background: #2a74ce;
    }
  }
  > .img-btn-wrap > .img-delete-btn {
    background: none;
    color: var(--color-sub);
    &:hover {
      background: var(--color-light-gray);
    }
    &:active {
      background: #d1d1d1;
    }
  }
`;
