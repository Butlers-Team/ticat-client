//react
import React, { useState } from 'react';

//style
import styled from 'styled-components';

//util
import { validateNickname } from '@utils/validateNickname';

interface Props {
  onValidNickname: (valid: boolean) => void;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

/** 2023/07/14 - 닉네임 입력창 - by leekoby */
const NicknameInputComponent: React.FC<Props> = ({ onValidNickname, value, onChange, placeholder }): JSX.Element => {
  const [validationMessage, setValidationMessage] = useState('');

  // input value , onchange 핸들러
  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const name = e.target.value;
    onChange(e);
    const message = validateNickname(name);
    if (message) {
      onValidNickname(false);
      setValidationMessage(message);
    } else {
      onValidNickname(true);
      setValidationMessage('');
    }
  };

  return (
    <>
      <InputContainer>
        <InputBox type="text" value={value} onChange={handleNicknameChange} placeholder={placeholder} maxLength={8} />
        <CharacterCount>{value.length}/8</CharacterCount>
      </InputContainer>
      {validationMessage.length > 0 && validationMessage && <ValidationMessage>{validationMessage}</ValidationMessage>}
    </>
  );
};
export const NicknameInput = React.memo(NicknameInputComponent);

const InputContainer = styled.div`
  position: relative;
`;

const CharacterCount = styled.span`
  position: absolute;
  right: 5px;
  top: 42%;
  transform: translateY(-50%);
  font-size: 1.6rem;
  color: var(--color-dark-gray);
`;

/** 2023/07/15 - 닉네임 컴포넌트  - by leekoby */
const InputBox = styled.input`
  width: 100%;
  height: 45px;
  margin-bottom: 9px;
  padding: 2px 5px;
  border-width: 0;
  outline: none;
  font-size: 1.6rem;
  font-weight: bold;
  ::placeholder {
    font-size: 1.6rem;
    color: rgba(130, 129, 129, 0.6);
  }
  &:focus {
    border-width: 0;
    border-bottom: 1px solid var(--color-sub);
    ::placeholder {
      opacity: 0;
    }
  }
`;

const ValidationMessage = styled.div`
  font-size: 1.2rem;
  color: red;
`;
