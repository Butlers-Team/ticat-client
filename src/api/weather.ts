import instance from './axiosInstance';

// type
import { WeatherRequest, WeatherType } from '../types/api/weather';

export const getWeather = async (params: WeatherRequest) => {
  const { data } = await instance.get<WeatherType>('/api/weather', {
    params,
    headers: { 'No-Auth': 'True' },
  });

  return data;
};
