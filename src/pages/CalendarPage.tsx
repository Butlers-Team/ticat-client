import styled from 'styled-components';

const CalendarPage: React.FC = (props): JSX.Element => {
  return (
    <>
      <CalendarSection />
      <FestivalListSection />
    </>
  );
};
export default CalendarPage;

const CalendarSection = styled.section`
  width: 100%;
  height: 20vh;
  border: solid 1px red;
  border-radius: 5px;
`;

const FestivalListSection = styled.section`
  width: 100%;
  height: 75vh;
  border: solid 1px blue;
  border-radius: 5px;
`;
