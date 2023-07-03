import styled from 'styled-components';
import { TiDeleteOutline } from 'react-icons/ti';
import { AiOutlineEye, AiFillEyeInvisible } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { VscError } from 'react-icons/vsc';

interface Props {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
  isShow?: boolean;
  onToggleShow?: React.MouseEventHandler<HTMLButtonElement>;
  isValid: boolean;
  validMessage: string;
}

/** 2023/06/29 - 로그인/회원가입 입력창 컴포넌트 - by leekoby */
const SignInputForm: React.FC<Props> = ({
  label,
  type,
  isShow,
  placeholder,
  name,
  value,
  onChange,
  onClear,
  onToggleShow,
  isValid,
  validMessage,
}) => {
  return (
    <InputContainer>
      <LabelWrapper>
        <InputLabel htmlFor={name}>{label}</InputLabel>
      </LabelWrapper>

      <InputBox
        type={type === 'password' ? (isShow ? 'text' : 'password') : type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {value && (
        <ButtonWrapper>
          {type === 'password' && name === 'password' && (
            <IconButton onClick={onToggleShow} type="button">
              {isShow ? (
                <AiOutlineEye size={20} style={{ color: 'gray', opacity: 0.7 }} />
              ) : (
                <AiFillEyeInvisible size={20} style={{ color: 'gray', opacity: 0.7 }} />
              )}
            </IconButton>
          )}

          <IconButton onClick={onClear} type="button">
            <TiDeleteOutline size={20} style={{ color: 'Crimson', opacity: 0.7 }} />
          </IconButton>
        </ButtonWrapper>
      )}
      {value && <InputValid isValid={isValid}>{validMessage}</InputValid>}
    </InputContainer>
  );
};

export default SignInputForm;

const LabelWrapper = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const InputLabel = styled.label`
  font-size: 1.2rem;
  color: var(--color-main);
  font-weight: bold;
`;
const InputValid = styled.span<{ isValid: boolean }>`
  padding-top: 1rem;
  font-size: 1.2rem;
  display: flex;
  justify-content: start;
  color: ${({ isValid }) => (isValid ? 'green' : 'red')};
`;

const IconButton = styled.button`
  padding: 0;
  outline: none;
  border: none;
  background-color: transparent;
`;

const InputContainer = styled.div`
  padding: 10px 0;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 42%;
  right: 10px;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: rows;
  margin-bottom: 5px;
`;

/** 2023/06/29 - 인풋창 컴포넌트 - by leekoby */
const InputBox = styled.input`
  border-radius: 5px;

  width: 100%;
  height: 4.5rem;
  padding-bottom: 1rem;
  padding: 0.2rem 0.5rem;
  border: 0.1rem solid #a5a5a5;

  ::placeholder {
    padding-left: 0.1rem;
    color: rgba(130, 129, 129, 0.6);
    font-size: 1.1rem;
  }
  &:focus {
    outline: none;
    border: 2px solid var(--color-sub);
    ::placeholder {
      opacity: 0;
    }
  }
`;
