import { ReactNode } from 'react';
import styled from 'styled-components';

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: string;
  height?: string;
  fontSize?: string;
  margin?: string;
}

const Button: React.FC<BtnProps> = ({ children, ...props }) => {
  return <PublicButton {...props}>{children}</PublicButton>;
};
export default Button;

/** 2023/06/29 - 서비스 공용 버튼 컴포넌트 - parksubeom */
const PublicButton = styled.button<Pick<BtnProps, 'width' | 'height' | 'fontSize' | 'margin'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '4.5rem'};
  font-size: ${({ fontSize }) => fontSize ?? '14px'};
  border-radius: 5px;
  border: none;
  margin: ${({ margin }) => margin ?? '10px 0px'};
  background-color: ${({ color }) => color ?? 'var(--color-main)'};
  color: var(--color-light);
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    color: var(--color-light);
    opacity: 0.3;
    cursor: not-allowed;

    &:hover {
      background-color: ${({ color }) => color ?? 'var(--color-main)'};
    }
  }

  &:hover {
    background-color: ${({ color }) => color ?? `var(--color-sub)`};
  }
`;
