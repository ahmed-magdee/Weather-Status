export interface Weather {
  currentConditions: Conditions;
  days: Conditions[];
  description: string;
  resolvedAddress: string;
  address: string;
}

export interface Conditions {
  cloudcover: number;
  conditions: string;
  description: string;
  datetime: string;
  tempmax: number;
  tempmin: number;
  precipcover?: number;
  dew: number;
  feelslike: number;
  feelslikemax: number;
  feelslikemin: number;
  humidity: number;
  icon: string;
  moonphase: number;
  precip: number;
  precipprob: number;
  preciptype: number;
  pressure: number;
  snow: number;
  snowdepth: number;
  solarenergy: number;
  solarradiation: number;
  sunrise: string;
  sunset: string;
  sunsetEpoch: number;
  temp: number;
  uvindex: number;
  visibility: number;
  winddir: number;
  windgust: number;
  windspeed: number;
  hours: {
    datetime: string;
    cloudcover: number;
    conditions: string;
    description: string;
    dew: string;
    feelslike: string;
    precipcover?: number;
    feelslikemax: string;
    feelslikemin: string;
    icon: string;
    precip: number;
    precipprob: number;
    pressure: number;
    snow: number;
    temp: number;
    visibility: number;
    winddir: number;
    windgust: number;
    windspeed: number;
  }[];
}
