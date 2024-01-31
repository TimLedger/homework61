import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

interface CountryData {
  name: string;
  population: number;
  region: string;
  capital: string;
  borders: string[];
}

interface Country {
  name: string;
}

interface Props {
  countryCode: string | null;
}

const CountryInfo: React.FC<Props> = ({ countryCode }) => {
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get<CountryData>(`https://restcountries.com/v2/alpha/${countryCode}`);
        setCountryData(response.data);
        
        const borderNames = await Promise.all(
          response.data.borders.map(async (borderCode) => {
            const borderResponse = await axios.get<Country>(`https://restcountries.com/v2/alpha/${borderCode}`);
            return borderResponse.data;
          })
        );
        setBorderCountries(borderNames);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    if (countryCode) {
      fetchCountryData();
    } else {
      setCountryData(null);
      setBorderCountries([]);
    }
  }, [countryCode]);

  return (
    <div>
      {countryData ? (
        <div>
          <Typography variant="h4">{countryData.name}</Typography>
          <Typography variant="body1">Население: {countryData.population}</Typography>
          <Typography variant="body1">Регион: {countryData.region}</Typography>
          <Typography variant="body1">Столица: {countryData.capital}</Typography>
          <Typography variant="body1">Граничит с:</Typography>
          <List>
            {borderCountries.map((country, index) => (
              <ListItem key={index}>
                <ListItemText primary={country.name} />
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <Typography>Выберите страну</Typography>
      )}
    </div>
  );
};

export default CountryInfo;
