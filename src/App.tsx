import React, { useState } from 'react';
import CountryList from './components/CountryList';
import CountryInfo from './components/CountryInfo';
import './App.css';

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
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-content">
          <CountryList onSelectCountry={handleCountrySelect} />
        </div>
      </div>
      <div className="country-info">
        <div className="country-info-card">
          <CountryInfo countryCode={selectedCountryCode} />
        </div>
      </div>
    </div>
  );
};

export default App;