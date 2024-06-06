import React, { useState } from "react";
import Cloud from "../assets/cloud.png";
import Sunny from "../assets/sunny.png";
import Rainy from "../assets/rainy.png";

const CardsSection = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const api = {
    key: "8a42eda1bf3f66190b03fb48386c71e3",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const searchPressed = (e) => {
    console.log("search Pressed");
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
        setError("");
        console.log(result);
      })
      .catch((error) => {
        setError(error.message);
        setWeather({});
        console.log(error);
      });
  };
  let imgType = "";
  if (weather.weather && weather.weather[0]) {
    if (weather.weather[0].main.toLowerCase() === "clear") {
      imgType = Sunny;
    } else if (weather.weather[0].main.toLowerCase() === "rain") {
      imgType = Rainy;
    } else if (
      weather.weather[0].main.toLowerCase() === "clouds" ||
      weather.weather[0].main.toLowerCase() === "smoke"
    ) {
      imgType = Cloud;
    } else {
      imgType = Sunny;
    }
  }

  return (
    <div>
      <div className="max-w-md mx-auto m-5 border-2">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <input
            className="peer h-full w-full outline-none text-center text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city..."
          />
          <div
            onClick={searchPressed}
            className="grid place-items-center h-full w-12 text-gray-300 hover:text-gray-600 hover:bg-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {weather.name ? (
        <div className="flex justify-center items-center py-5">
          <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-1 gap-5 space-y-4 md:space-y-0">
            <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
              <h3 className="mb-3 text-xl font-bold text-indigo-600">
                {weather.name}
              </h3>
              <div className="relative">
                <img
                  className="w-full rounded-xl"
                  src={imgType}
                  alt="Weather"
                />
              </div>
              <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                Temperature : {weather.main.temp}° C
              </h1>
              <div className="my-4">
                <div className="flex space-x-1 font-bold items-center">
                  <p>Weather : {weather.weather[0].main}</p>
                </div>
                <div className="flex space-x-1 font-bold items-center">
                  <p>Temp Feels Like : {weather.main.feels_like}° C</p>
                </div>
                <div className="flex space-x-1 items-center">
                  <p>Max Temp : {weather.main.temp_max}° C</p>
                </div>
                <div className="flex space-x-1 items-center">
                  <p>Min Temp : {weather.main.temp_min}° C</p>
                </div>
                <div className="flex space-x-1 items-center">
                  <p>Humidity: {weather.main.humidity}%</p>
                </div>
                <div className="flex space-x-1 items-center">
                  <p>
                    Visibility : <span>{weather.visibility / 1000} Km</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        !error && <p className="text-center">Please Enter City</p>
      )}
    </div>
  );
};

export default CardsSection;
