import React from "react";
import { useState } from "react";
import './style.scss';

type Props = {
  setCurrentCity: (arg: string) => void,
};

export const Search: React.FC<Props> = ({ setCurrentCity}) => {
  const [city, setCity] = useState('');
  const [placeholder, setPlaceholder] = useState('Weather in your city');
  const [emptyInput, setEmptyInput] = useState(false);


  const handleButtonClick = () => {
    if (city.trim() === "") {
      setPlaceholder('')
      setEmptyInput(true);
    } else {
      setCurrentCity(city);
      setPlaceholder('Weather in your city');
    }
  };

  const handleInputClick = () => {
    if (city.length === 0) {
      setPlaceholder('Weather in your city');
      setEmptyInput(false);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (city.length === 0) {
      setPlaceholder('Weather in your city');
      setEmptyInput(false);
    }

    setCity(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (city.trim().length === 0) {
      setPlaceholder('')
      setEmptyInput(true);
    }

    if (e.key === 'Enter') {
      handleButtonClick();
    }
  }

  
  return (
    <div className="search-container">
      <div className="search">
        <div className="search__box"></div>
        <h1 className="search__title">WEATHER</h1>
        <div className="search__form">
          <div className="input-wrap">
            <input
              className="search__input"
              type="text"
              value={city}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onClick={handleInputClick}
              placeholder={placeholder}
            />
            {emptyInput && (
              <p className="empty-input">Please write the city</p>
            )}
          </div>
          <button
            className="search__button"
            type="button"
            onClick={handleButtonClick}
          >
            search
          </button>
        </div>
      </div>
    </div>
  );
};
