import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CountryData {
  name: string;
  population: number;
  region: string;
  capital: string;
  borders: string[];
}

interface Props {
  countryCode: string | null;
}

const CountryInfo: React.FC<Props> = ({ countryCode }) => {
  const [countryData, setCountryData] = useState<CountryData | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get<CountryData>(`https://restcountries.com/v2/alpha/${countryCode}`);
        setCountryData(response.data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    if (countryCode) {
      fetchCountryData();
    } else {
      setCountryData(null);
    }
  }, [countryCode]);

  return (
    <div>
      {countryData ? (
        <div>
          <h2>{countryData.name}</h2>
          <p>Население: {countryData.population}</p>
          <p>Регион: {countryData.region}</p>
          <p>Столица: {countryData.capital}</p>
          <p>Граничит с: {countryData.borders.join(', ')}</p>
        </div>
      ) : (
        <p>Выберите страну</p>
      )}
    </div>
  );
};

export default CountryInfo;
