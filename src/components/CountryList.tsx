import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface Country {
  alpha3Code: string;
  name: string;
}

interface Props {
  onSelectCountry: (country: Country) => void;
}

const CountryList: React.FC<Props> = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v2/all?fields=alpha3Code,name');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  const handleCountrySelect = async (country: Country) => {
    onSelectCountry(country);
  };

  return (
    <div>
      <Typography variant="h4" className='title'>Страна:</Typography>
      <List>
        {countries.map((country) => (
          <ListItem key={country.alpha3Code} button onClick={() => handleCountrySelect(country)}>
            <ListItemText primary={country.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CountryList;
