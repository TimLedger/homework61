import React, { useState } from 'react';
import CountryList from './components/CountryList';
import CountryInfo from './components/CountryInfo';

interface Country {
  alpha3Code: string;
  name: string;
}

const App: React.FC = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountryCode(country.alpha3Code);
  };

  return (
    <div>
      <CountryList onSelectCountry={handleCountrySelect} />
      <CountryInfo countryCode={selectedCountryCode} />
    </div>
  );
};

export default App;
