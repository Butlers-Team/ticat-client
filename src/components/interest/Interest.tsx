//react
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
//style
import styled from 'styled-components';
//types
import { ApiInterestRequest } from 'types/api';
//components
import Button from '@components/Button';
import { Category } from '@components/interest/Category';
import { NicknameInput } from '@components/interest/NickNameInput';
import TopHistoryBackNav from '@components/TopHistoryBackNav';
//hooks
import { useRegisterInterest } from '@hooks/query';
//store
import { useTokenStore } from '@store/useTokenStore';
import { useMemberStore } from '@store/useMemberStore';

interface Props {}

/** 2023/07/14 - 관심사등록 Component - by leekoby */
const Interest: React.FC<Props> = (): JSX.Element => {
  const navigate = useNavigate();

  const interestMutation = useRegisterInterest();
  const [nickname, setNickname] = useState(''); //닉네임
  const [previousNickname, setPreviousNickname] = useState(''); // 다음으로 넘어갔다 돌아올때 닉네임 채워넣기 위해 만듦

  // 공통 카테고리 선택을 위한 state
  const [category, setCategory] = useState<string[]>([]);

  const [validNickname, setValidNickname] = useState(false);

  const [registerInterestsEnabled, setRegisterInterestsEnabled] = useState(false);

  const handleNicknameValidationChange = useCallback((valid: boolean) => {
    setValidNickname(valid);
  }, []);

  const handleNextButtonClick = useCallback(() => {
    if (validNickname) {
      setPreviousNickname(nickname);
      setRegisterInterestsEnabled(!registerInterestsEnabled);
    }
  }, [validNickname, nickname, registerInterestsEnabled]);

  const handleCancelButtonClick = useCallback(() => {
    setRegisterInterestsEnabled(false);
    setPreviousNickname(nickname);
  }, [nickname]);

  const handleNicknameChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(event => {
    setNickname(event.target.value);
  }, []);

  const handleCategorySubmit = () => {
    const interestData: ApiInterestRequest = {
      displayName: nickname,
      categories: category,
    };

    interestMutation.mutate(interestData);
  };

  const NavigateMainPage = () => {
    sessionStorage.setItem('menuIdx', `0`);
    navigate('/');
  };
  return (
    <>
      {registerInterestsEnabled ? (
        <>
          <TopHistoryBackNav textTitle="관심 카테고리" onNavigation={handleCancelButtonClick} />
          <InterestWrapper>
            <TitleWrapper>
              <Title>
                좋아하거나 관심있는 <br />
                주제를 선택해주세요.
              </Title>
            </TitleWrapper>
            <Category category={category} setCategory={setCategory} onSubmit={handleCategorySubmit} />
          </InterestWrapper>
        </>
      ) : (
        <>
          <TopHistoryBackNav textTitle="닉네임 등록" onNavigation={NavigateMainPage} />
          <InterestWrapper>
            <TitleWrapper>
              <Title>
                닉네임이 필요해요! <br />
                어떻게 불러드릴까요?
              </Title>
            </TitleWrapper>
            <InputContainer>
              <NicknameInput
                onValidNickname={handleNicknameValidationChange}
                value={registerInterestsEnabled ? previousNickname : nickname}
                onChange={handleNicknameChange}
                placeholder={'2~8자 사이의 닉네임'}
              />
            </InputContainer>
            <ButtonContainer>
              <Button disabled={!validNickname} onClick={handleNextButtonClick} fontSize="1.6rem">
                다음
              </Button>
            </ButtonContainer>
          </InterestWrapper>
        </>
      )}
    </>
  );
};

export default Interest;

/** 2023/07/15 - 닉네임/관심사 등록 컨테이너 - by leekoby */
const InterestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80%;
  width: 90%;
  max-width: 33rem;
  margin: 4rem auto;

  animation: showupLayout 0.5s forwards;

  .contents-box {
    /* padding: 20px; */
    > h2 {
      width: 100%;
      font-size: 18px;
      font-weight: 700;
    }
    > div {
      margin: 20px 0px;
    }
  }

  @keyframes showupLayout {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 1;
      transform: translateY(-40px);
    }
    100% {
      opacity: 1;
      transform: translateY(-30px);
    }
  }
`;

/** 2023/07/15 - 닉네임/관심사 타이틀  - by leekoby */
const Title = styled.h2`
  white-space: nowrap;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-dark-g);
`;

const TitleWrapper = styled.div`
  width: 100%;
  text-align: left;
`;

/** 2023/07/15 - 닉네임 인풋 컨테이너  - by leekoby */
const InputContainer = styled.div`
  display: inline-block;
  margin: 0 auto;
  width: 100%;
  align-content: center;
  text-align: center;
`;

/** 2023/07/15 - 버튼 컨테이너  - by leekoby */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  flex-direction: column;
  margin: 5px auto;
  width: 100%;
`;
