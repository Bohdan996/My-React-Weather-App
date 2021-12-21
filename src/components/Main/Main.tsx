import React, { useState } from "react";
import { DataDaily } from '../../Types/Data';
import './style.scss';

type Props = {
  textColor: string,
  dataDaily: DataDaily,
  temperature: (arg: number) => number,
}

export const Main: React.FC<Props> = ({ dataDaily, temperature, textColor }) => {
  const [tempType, setTemptype] = useState('C');
  const [transformFah, setTransformFah] = useState("180deg");
  const [transformCel, setTransformCel] = useState("0");

  const toFahrenheit = (num: number) => {
    return Math.round((temperature(num) * 9 / 5) + 32);
  }

  const changeTempType = () => {
    if (tempType === 'C') {
      setTemptype('F')
      setTransformFah("0")
      setTransformCel("180deg")
    } else {
      setTemptype('C')
      setTransformFah("180deg")
      setTransformCel("0")
    }
  };

  return (
    (dataDaily.daily) ? (
      <main className="main">
        <div className="main__data-info">
          <div className="main__data-box"></div>
          <div className="table">
            <div className="table__row">
              {dataDaily.daily.map(day => (
                <div className="table__column" key={day.dt}>
                  <div className="table__title">
                    <h3>{new Date(day.dt * 1000).toLocaleString("en-US", { weekday: "long" })}</h3>
                    <h3 className="table__title--red">{new Date(day.dt * 1000).toLocaleString("en-US", { day: "numeric" })}</h3>
                    <h3>{new Date(day.dt * 1000).toLocaleString("en-US", { month: "long" })}</h3>
                  </div>
                  <div
                    className="table__icon"
                    style={{
                      backgroundImage: `url(https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png)`,
                    }}
                  >
                  </div>
                  <div className="table__day-info">
                    {(tempType === "C") ? (
                      <p className="table__item-info">
                        <span>temp:</span>
                        <span>{temperature(day.temp.day)} C&#176;</span>
                      </p>
                    ) : (
                      <p className="table__item-info">
                        <span>temp:</span>
                        <span>{toFahrenheit(day.temp.day)} F&#176;</span>
                      </p>
                    )}
                    <p className="table__item-info">
                      <span>pressure:</span>
                      {day.pressure} hPa
                    </p>
                    <p className="table__item-info">
                      <span>w. speed:</span>
                      {day.wind_speed} m/s
                    </p>
                    <p className="table__item-info">
                      <span>humidity:</span>
                      {day.humidity} %
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="main__temp">
          <div
            className="main__temp-value"
            onClick={changeTempType}
          >
            <div
              className="celsius"
              style={{
                transform: `rotateY(${transformCel})`,
                borderColor: textColor,
              }}
            >
              &lt; <span className="main__temp--size">{temperature(dataDaily.current.temp)}</span> <span className="main__temp-value--size">C&#176;</span> &gt;
            </div>
            <div
              className="fahrenheit"
              style={{
                transform: `rotateY(${transformFah})`,
                borderColor: textColor,
              }}
            >
              &lt; <span className="main__temp--size">{toFahrenheit(dataDaily.current.temp)}</span> <span className="main__temp-value--size">F&#176;</span> &gt;
            </div>
          </div>
          <div className="main__temp-day">
            <h2 className="main__temp-day-title">
              {dataDaily.current.weather[0].main}
            </h2>
            <p className="main__temp-day-info">
              pressure: {dataDaily.current.pressure} hPa
            </p>
            <p className="main__temp-day-info">
              w. speed: {dataDaily.current.wind_speed} m/s
            </p>
            <p className="main__temp-day-info">
              humidity: {dataDaily.current.humidity} %
            </p>
          </div>
        </div>
      </main>
    ) : (
      <div>error</div>
    )
  );
};
