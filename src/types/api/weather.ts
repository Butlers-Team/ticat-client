export interface WeatherType {
  region: string;
  weather: {
    temp: number;
    rainAmount: string;
    humid: number;
    lastUpdateTime: string;
    sky: string;
  };
  message: string;
}

export interface WeatherRequest {
  currentLongitude: number;
  currentLatitude: number;
}

export interface WeatherResponse {
  data?: WeatherType;
}
