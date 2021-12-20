export type DataDaily = {
  current: {
    temp: number,
    pressure: number,
    wind_speed: number,
    humidity: number,
    weather: [
      {
        main: string,
        description: string,
        icon: string,
      }
    ],
    name: string,
  },
  daily: [
    {
      dt: number,
      temp: {
        day: number,
      },
      pressure: number,
      wind_speed: number,
      humidity: number,
      weather: [
        {
          icon: string,
        }
      ],
    }
  ]
}
