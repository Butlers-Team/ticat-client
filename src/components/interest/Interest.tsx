import Button from '@components/Button';
import { useEffect, useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NicknameInput from './NickNameInput';

interface Props {}

/** 2023/07/14 - 관심사등록 Component - by leekoby */
const Interest: React.FC<Props> = (props): JSX.Element => {
  const [nickname, setNickname] = useState('');
  const [previousNickname, setPreviousNickname] = useState('');

  const [interest, setInterest] = useState<string[]>([]);

  const [validNickname, setValidNickname] = useState(false);

  const [registerInterestsEnabled, setRegisterInterestsEnabled] = useState(false);

  const handleNicknameValidationChange = (valid: boolean) => {
    setValidNickname(valid);
  };

  const handleNextButtonClick = () => {
    if (validNickname) {
      setRegisterInterestsEnabled(!registerInterestsEnabled);
      setPreviousNickname(nickname);
    }
  };

  const handleCancelButtonClick = () => {
    setRegisterInterestsEnabled(false);
    setNickname(previousNickname);
  };

  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setNickname(event.target.value);
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
            '여기에 관심사등록하는거 만들거야'
          </>
        ) : (
          <>
            <Link to="/">
              <ArrowWrap>
                <MdArrowBackIosNew size="20px" color="var(--color-dark)" />
              </ArrowWrap>
            </Link>
            <InputContainer>
              <NicknameInput
                onValidNickname={handleNicknameValidationChange}
                value={nickname}
                onChange={handleNicknameChange}
                placeholder={
                  !registerInterestsEnabled && previousNickname ? previousNickname : '5~8자 사이의 닉네임을 입력하세요.'
                }
              />
            </InputContainer>
            {!validNickname && <div>유효하지 않은 닉네임입니다.</div>}
            <ButtonContainer>
              <Button disabled={!validNickname} onClick={handleNextButtonClick}>
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
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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
  width: 270px;
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
  width: 270px;
`;

const ArrowWrap = styled.div`
  width: 3.5rem;
  cursor: pointer;
  align-self: flex-start;
`;
