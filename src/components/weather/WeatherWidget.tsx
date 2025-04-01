
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWeather } from '../../store/slices/weatherSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sun, Cloud, CloudRain, Loader } from 'lucide-react';

const WeatherWidget = () => {
  const [city, setCity] = useState('New York');
  const [searchCity, setSearchCity] = useState('');
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [dispatch, city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity.trim());
    }
  };

  const getWeatherIcon = () => {
    if (!data) return <Sun className="w-10 h-10 text-yellow-500" />;
    
    const iconId = data.icon;
    if (iconId.includes('01')) return <Sun className="w-10 h-10 text-yellow-500" />;
    if (iconId.includes('02') || iconId.includes('03') || iconId.includes('04')) 
      return <Cloud className="w-10 h-10 text-gray-500" />;
    return <CloudRain className="w-10 h-10 text-blue-500" />;
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <Input
            placeholder="Enter city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <Button type="submit" variant="outline">Search</Button>
        </form>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader className="w-6 h-6 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-2">
            Error: Could not fetch weather data
          </div>
        ) : data ? (
          <div className="flex items-center gap-4">
            {getWeatherIcon()}
            <div>
              <div className="text-2xl font-bold">
                {Math.round(data.temperature)}°C
              </div>
              <div className="text-gray-500 capitalize">
                {data.description} in {data.city}
              </div>
            </div>
          </div>
        ) : null}
        
        <div className="mt-4 text-sm text-gray-500">
          Plan your outdoor tasks according to the weather!
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
