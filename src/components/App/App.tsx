import { useEffect, useState  } from 'react';
import { getDailyApibyCoords, getGeo, getReverseGeo } from '../../api';
import { Search } from '../Search/Search';
import './style.scss';
import fog from '../../images/mist.png';
import rain from '../../video/rain.mp4';
import sun from '../../video/sunny.mp4';
import cloud from '../../video/cloud.mp4';
import snow from '../../video/snow2.mp4';
import { Main } from '../Main/Main';
import { DataDaily } from '../../Types/Data';
import Loader from "react-loader-spinner";

const App = () => {
  const [dataDaily, setDataDaily] = useState<DataDaily | any>({});
  const [currentCity, setCurrentCity] = useState("");
  const [background, setBackground] = useState("");
  const [video, setVideo] = useState("");
  const [latitude, setLat] = useState(0);
  const [longitude, setLon] = useState(0);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [textColor, setTextColor] = useState("#000");

  const temperature = (num: number) => {
    return Math.round(num - 273.15);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLon(position.coords.longitude);
      setLat(position.coords.latitude);
    });
  }, []);

  useEffect(() => {
    currentCity && getGeo(currentCity)
      .then(res => {
        setLat(res[0].lat)
        setLon(res[0].lon)
        setCityName(res[0].name)
        setCountry(res[0].country)
      })
      .catch(er => setDataDaily({}))
  }, [currentCity]);  

  useEffect(() => {
    latitude && longitude && getDailyApibyCoords(latitude, longitude)
      .then(res => {
        setDataDaily(res)
      })
      .catch(er => setDataDaily({}))
    
    latitude && longitude && getReverseGeo(latitude, longitude)
      .then(res => {
        setCityName(res[0].name)
        setCountry(res[0].country)
      })
      .catch(er => setDataDaily({}))
  }, [latitude, longitude]);

  useEffect(() => {
    if (dataDaily.current) {
      if (dataDaily.current.weather[0].main === "Clouds") {
        setBackground('none')
        setTextColor('#000')
        setVideo(cloud)
      } else if (dataDaily.current.weather[0].main === "Mist" && dataDaily.current.weather[0].main === "Haze") {
        setBackground(`url(${fog})`)
        setTextColor('#000')
        setVideo(cloud)
      } else if (dataDaily.current.weather[0].main === "Rain" || dataDaily.current.weather[0].main === "Drizzle" || dataDaily.current.weather[0].main === "	Thunderstorm") {
        setBackground(`none`)
        setVideo(rain)
        setTextColor('#000')
      } else if (dataDaily.current.weather[0].main === "Snow") {
        setBackground('none')
        setVideo(snow)
        setTextColor('#fff')
      } else if (dataDaily.current.weather[0].main === "Clear") {
        setBackground('none')
        setVideo(sun)
        setTextColor('#000')
      } else {
        setVideo('none')
        setBackground(`none`)
      }
    } 
  }, [dataDaily]);

  return (
    <>
      {dataDaily.current ? (
        <div className="page" style={{
          backgroundImage: background,
          color: textColor,
        }} >
          <video className="video" src={video} autoPlay loop muted></video>
          <div className="header">
            <Search setCurrentCity={setCurrentCity} />
            <div className="header__title">
              <div className="header__city"
              >{cityName} ({country})</div>
            </div>
          </div>
          <Main
            textColor={textColor}
            dataDaily={dataDaily}
            temperature={temperature}
          />
        </div>
      ) : (
        <div className="page" style={{
          backgroundImage: background,
        }} >
          <video className="video" src={video} autoPlay loop muted></video>
          <div className="header">
            <Search setCurrentCity={setCurrentCity} />
            <div className="header__title">
                <div className="header__city">City not found</div>
            </div>
          </div>
          <main className="loader">
            <Loader
              type="ThreeDots"
              color="gold"
              height={100}
              width={100}
            />
          </main>
        </div>
      )}
    </>
  )
}

export default App;