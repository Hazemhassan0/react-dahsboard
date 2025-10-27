import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

const WeatherWidget = () => {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const API_KEY = "f5371d5fec241c96d7f8b9773713091a";

  const { data, isLoading, error} = useQuery<WeatherData>({
    queryKey: ["weather", searchCity],
    queryFn: async () => {
      if (!searchCity) throw new Error("Please enter a city name");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    },
    enabled: !!searchCity,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCity(city);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-opacity-95">
      <h2 className="font-bold mb-6 text-xl text-gray-800 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
        Weather Widget
      </h2>
      
      <form onSubmit={handleSearch} className="mb-6 flex gap-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <div className="text-gray-600 animate-pulse flex items-center gap-2">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Fetching weather...
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-50 p-4 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error instanceof Error ? error.message : "Error fetching data"}
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              className="w-20 h-20 drop-shadow-md"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{data.name}</h3>
              <p className="text-gray-600 capitalize text-lg">
                {data.weather[0].description}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Temperature</div>
              <div className="text-3xl font-bold text-gray-800">{Math.round(data.main.temp)}°C</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Humidity</div>
              <div className="text-3xl font-bold text-gray-800">{data.main.humidity}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;