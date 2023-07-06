import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getCatergories } from '../api/catergory';

// components
import CatergoryTabNav from '@components/festival/CatergoryTabNav';

const params = {
  category: '문화',
  page: 1,
  size: 10,
};

const FestivalListPage = () => {
  const { data, status, error } = useQuery(['categories'], async () => {
    const response = await getCatergories(params);
    return response.data;
  });

  console.log('data >> ', data);
  console.log('status >> ', status);
  console.log('error >> ', error);

  return (
    <FestivalListContainer>
      <CatergoryTabNav />
    </FestivalListContainer>
  );
};

export default FestivalListPage;

/** 2023/07/04 - 축제 리스트 컨테이너 - by sineTlsl */
const FestivalListContainer = styled.section`
  width: 100%;
  height: 100%;
`;
