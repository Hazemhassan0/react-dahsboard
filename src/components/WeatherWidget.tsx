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

  const { data, isLoading, error, refetch } = useQuery<WeatherData>({
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
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h2 className="font-bold mb-4 text-lg">Weather Widget</h2>
      
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <div className="text-gray-600">Fetching weather...</div>
      )}

      {error && (
        <div className="text-red-500">
          {error instanceof Error ? error.message : "Error fetching data"}
        </div>
      )}

      {data && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              className="w-16 h-16"
            />
            <div>
              <h3 className="text-xl font-semibold">{data.name}</h3>
              <p className="text-gray-600 capitalize">
                {data.weather[0].description}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-sm text-gray-600">Temperature</div>
              <div className="text-xl font-semibold">{Math.round(data.main.temp)}°C</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-sm text-gray-600">Humidity</div>
              <div className="text-xl font-semibold">{data.main.humidity}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;