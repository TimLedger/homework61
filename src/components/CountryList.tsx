import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
  onSelectCountry: (country: { alpha3Code: string; name: string }) => void;
}

const CountryList: React.FC<Props> = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState<{ alpha3Code: string; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ alpha3Code: string; name: string }[]>('https://restcountries.com/v2/all?fields=alpha3Code,name');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  const handleCountrySelect = async (country: { alpha3Code: string; name: string }) => {
    onSelectCountry(country);
  };

  return (
    <div>
      <h2>Выберите страну</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.alpha3Code} onClick={() => handleCountrySelect(country)}>
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
