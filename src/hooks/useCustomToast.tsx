import { UseToastOptions, useToast } from '@chakra-ui/react';

/** 2023/07/07 - 기본 설정을 적용한 "chakra-ui"의 "toast" - by leekoby */
const useCustomToast = () => {
  const chakraToast = useToast();

  const toast = (option: UseToastOptions | undefined) =>
    chakraToast({
      ...option,
      duration: 2500,
      isClosable: true,
      position: 'top',
      containerStyle: {
        fontSize: '1.5rem', // 글자 크기 조절
        maxWidth: '80%', // 원하는 최대 너비
      },
    });

  return toast;
};

export default useCustomToast;
