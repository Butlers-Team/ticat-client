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
  // 빈칸없음, 완전한 한글, 최소 5자, 최대 8자
  const validateNickname = (name: string): boolean => {
    const noSpaces = !/\s/.test(name);
    const onlyAllowedChars = /^[가-힣a-zA-Z0-9]+$/.test(name);
    const minLength = name.length >= 5;
    const maxLength = name.length <= 8;

    return noSpaces && onlyAllowedChars && minLength && maxLength;
  };

  // input value , onchange 핸들러
  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const name = e.target.value;
    onChange(e);
    onValidNickname(validateNickname(name));
  };

  return <InputBox type="text" value={value} onChange={handleNicknameChange} placeholder={placeholder} />;
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

  ::placeholder {
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
