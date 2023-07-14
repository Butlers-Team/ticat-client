import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  onValidNickname: (valid: boolean) => void;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}
/** 2023/07/14 - 닉네임 입력창 - by leekoby */
const NicknameInput: React.FC<Props> = ({ onValidNickname, value, onChange, placeholder }): JSX.Element => {
  const [validationMessage, setValidationMessage] = useState('');

  // 빈칸없음, 완전한 한글, 최소 5자, 최대 8자
  const validateNickname = (name: string): string => {
    if (/\s/.test(name)) {
      return '닉네임에 공백을 포함할 수 없습니다.';
    }
    if (!/^[가-힣a-zA-Z0-9]+$/.test(name)) {
      return '닉네임은 한글, 영문, 숫자만 가능합니다.';
    }
    if (name.length < 5) {
      return '닉네임은 최소 5자 이상이어야 합니다.';
    }
    if (name.length > 8) {
      return '닉네임은 최대 8자까지 가능합니다.';
    }

    return ''; // 유효한 닉네임인 경우, 빈 문자열을 반환
  };

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
      <InputBox type="text" value={value} onChange={handleNicknameChange} placeholder={placeholder} />
      {validationMessage && <div>{validationMessage}</div>}
    </>
  );
};
export default NicknameInput;
/** 2023/07/15 - 닉네임 컴포넌트  - by leekoby */
const InputBox = styled.input`
  width: 100%;
  height: 45px;
  margin-bottom: 9px;
  padding: 2px 5px;
  border-width: 0;
  outline: none;
  font-size: 1.8rem;
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
