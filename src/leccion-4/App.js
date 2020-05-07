import React, { useEffect, useState } from 'react';
import './App.css';

const URL = 'http://localhost:4000/countries';

function App() {
  const [countries, setCountries] =  useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchCountries = async() => {
      const response = await fetch(URL);
      const countries = await response.json();

      setCountries(countries);
      setIsLoading(false)
    }
    fetchCountries();
  },[]);

  if(isLoading) {
    return <p>...Loading</p>
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h3>Cuadro de medallas</h3>
        <div>
          {
            countries.map(country => (
              <p>{country}</p>
            ))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
