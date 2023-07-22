import { FaSun, FaCloud, FaSnowflake, FaCloudRain } from 'react-icons/fa';
import { WeatherType } from 'types/api/weather';

interface FestivalCoverProps {
  regionWeather?: WeatherType;
}
/**사용법 :
 * 1.해당 축제의 좌표를 받아와서 api/weather 에 있는 getWeather 함수를 이용하여 해당지역 날씨를 받아온다.
 * 2.해당지역 날씨를 regionWeater라고 정의하고, 지역날씨정보를 WeatherIcon 컴포넌트의 프롭스로 내려준다.
 * 3.프롭스로 내려받은 날씨정보에서 현재 기상정보를 뽑아서 WeaterIcon과 매핑하여 일치하는 아이콘을 리턴한다.
 */
export const WeatherIcon: React.FC<FestivalCoverProps> = ({ regionWeather }) => {
  const weather: string = regionWeather ? regionWeather?.weather.sky : '맑음';
  const WeatherIcons: { [key: string]: JSX.Element } = {
    맑음: <FaSun />,
    비: <FaCloudRain />,
    소나기: <FaCloudRain />,
    흐림: <FaCloud />,
    구름많음: <FaCloud />,
    눈: <FaSnowflake />,
  };
  const Icon: JSX.Element = WeatherIcons[weather] || <FaSun />;
  return Icon;
};
export default WeatherIcon;
