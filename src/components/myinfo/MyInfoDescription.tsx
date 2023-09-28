import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MyInfoType } from 'types/api/myinfo';

// icon
import { FiSettings } from 'react-icons/fi';

interface MyInfoDescriptionProps {
  memberInfo: MyInfoType;
}

const myInfoSocial = [
  { socialType: 'kakao', imgSrc: 'kakao-logo' },
  { socialType: 'naver', imgSrc: 'naver-logo' },
  { socialType: 'google', imgSrc: 'google-logo' },
];

/** 2023/07/21 - 회원 정보 소개 컴포넌트 - by sineTlsl */
const MyInfoDescription = ({ memberInfo }: MyInfoDescriptionProps) => {
  const navigate = useNavigate();

  /** 2023/07/21 - 설정 페이지로 이동 - by sineTlsl */
  const NavSettingPage = () => {
    navigate('/setting');
  };

  return (
    <MyInfoDescContainer>
      <>
        <MyInfoImgWrap>
          <img src={memberInfo.profileUrl || '/assets/images/default-profile-image.png'} />
        </MyInfoImgWrap>
        <MyInfoTextWrap>
          <p className="my-name">{memberInfo.displayName}</p>
          <div className="email-wrap">
            {memberInfo.social !== 'local' && (
              <>
                {myInfoSocial.map(item =>
                  memberInfo.social === item.socialType ? (
                    <img src={`/assets/images/${item.imgSrc}.png`} key={item.socialType} />
                  ) : null,
                )}
              </>
            )}
            <p className="my-email">{memberInfo.email}</p>
          </div>
        </MyInfoTextWrap>
        <MyInfoSettingWrap onClick={NavSettingPage}>
          <FiSettings size="20px" color="#838383" />
        </MyInfoSettingWrap>
      </>
    </MyInfoDescContainer>
  );
};

export default MyInfoDescription;

// 마이페이지 내 정보 소개
const MyInfoDescContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 110px;
  border-bottom: 1px solid var(--color-light-gray);
  padding: 0 2rem;
`;

// 이미지 정보
const MyInfoImgWrap = styled.div`
  height: 72px;
  width: 72px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

// 닉네임 및 이메일 정보
const MyInfoTextWrap = styled.div`
  width: calc(100% - 70px - 20px);
  height: 100%;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .my-name {
    color: var(--color-dark);
    font-size: 18px;
    font-weight: 700;
  }
  > .email-wrap {
    display: flex;
    gap: 0.5rem;

    > img {
      object-fit: cover;
      width: 20px;
      height: 20px;
    }
  }
  > .email-wrap > .my-email {
    color: var(--color-dark-gray);
    font-size: 14px;
    font-weight: 400;
  }
`;

const MyInfoSettingWrap = styled.div`
  width: 20px;
  height: 100%;
  padding-top: 2rem;
  cursor: pointer;
`;
