import { styled } from 'styled-components';

interface LodingProps {
  width?: string;
  height?: string;
  borderSize?: string; // 로딩바 굵기 지정
  bgColor?: string; // 로딩바 백그라운드
  barColor?: string; // 로딩바 메인컬러
}

const LodingIcon = ({ ...props }) => {
  return <LodingIconStyle {...props}></LodingIconStyle>;
};

export default LodingIcon;

const LodingIconStyle = styled.div<Pick<LodingProps, 'width' | 'height' | 'borderSize' | 'bgColor' | 'barColor'>>`
  margin: 5% auto;
  height: ${({ height }) => height ?? '30px'};
  width: ${({ width }) => width ?? '30px'};
  border: ${({ borderSize }) => borderSize ?? '3px'} solid #fff;
  border-right-color: ${({ barColor }) => barColor ?? 'var(--color-main)'};
  border-top-color: ${({ bgColor }) => bgColor ?? '#fff'};
  border-radius: 100%;
  animation: spin 1s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
