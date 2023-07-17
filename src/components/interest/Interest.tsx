import Button from '@components/Button';
import { useRegisterInterest } from '@hooks/query';
import { ApiInterestRequest } from 'types/api';
import { useState, useCallback, useEffect } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Category } from './Category';
import { NicknameInput } from './NickNameInput';

interface Props {}

/** 2023/07/14 - 관심사등록 Component - by leekoby */
const Interest: React.FC<Props> = (): JSX.Element => {
  const interestMutation = useRegisterInterest();
  const [nickname, setNickname] = useState(''); //닉네임
  const [previousNickname, setPreviousNickname] = useState(''); // 다음으로 넘어갔다 돌아올때 닉네임 채워넣기 위해 만듦

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

  return (
    <InterestContainer>
      <InterestWrapper>
        {registerInterestsEnabled ? (
          <>
            <ArrowWrap onClick={handleCancelButtonClick}>
              <MdArrowBackIosNew size="20px" color="var(--color-dark)" />
            </ArrowWrap>
            <Title>
              좋아하거나 관심있는 <br />
              주제를 선택해주세요.
            </Title>
            <Category category={category} setCategory={setCategory} onSubmit={handleCategorySubmit} />
          </>
        ) : (
          <>
            <ArrowWrap>
              <Link to="/">
                <MdArrowBackIosNew size="20px" color="var(--color-dark)" />
              </Link>
            </ArrowWrap>
            <Title>
              닉네임이 필요해요! <br />
              어떻게 불러드리면 될까요?
            </Title>
            <InputContainer>
              <NicknameInput
                onValidNickname={handleNicknameValidationChange}
                value={registerInterestsEnabled ? previousNickname : nickname}
                onChange={handleNicknameChange}
                placeholder={'5~8자 사이의 닉네임을 입력하세요.'}
              />
            </InputContainer>
            <ButtonContainer>
              <Button disabled={!validNickname} onClick={handleNextButtonClick} fontSize="1.6rem">
                다음
              </Button>
            </ButtonContainer>
          </>
        )}
      </InterestWrapper>
    </InterestContainer>
  );
};

export default Interest;
const InterestContainer = styled.section`
  position: relative;
  margin: 0px auto;
  width: 100%;
  height: 100%;
`;

/** 2023/07/15 - 닉네임/관심사 등록 컨테이너 - by leekoby */
const InterestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 2rem;
  height: 100%;
  margin: 0 auto;

  animation: showupLayout 0.5s forwards;
  .contents-box {
    padding: 20px;
    > h2 {
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
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-dark-g);
  margin-bottom: 3rem;
`;

/** 2023/07/15 - 닉네임 인풋 컨테이너  - by leekoby */
const InputContainer = styled.div`
  display: inline-block;
  margin: 0 auto;
  width: 300px;
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
  width: 300px;
`;

const ArrowWrap = styled.div`
  padding: 1rem;
  width: 3.5rem;
  align-self: flex-start;
  cursor: pointer;

  svg {
    align-items: center;
    justify-content: center;
  }
`;
