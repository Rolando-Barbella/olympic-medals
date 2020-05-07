import React, { useEffect, useState } from 'react';
import './App.css';

const URL = 'http://localhost:4000/countries';

function App() {
  const [countries, setCountries] =  useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async() => {
      try {
        const response = await fetch(URL);
        const countries = await response.json();
  
        setCountries(countries);
        setIsLoading(false);
      } catch(e) {
        setIsError(true);
      }
    }
    fetchCountries();
  }, []);

  if(isLoading) {
    return (
      <div className="App App-container">
        <p style={{color: '#fff'}}>...Cargando</p>
      </div>
    )
  }

  return (
    <div className="App">
      <section className="App-container">
        <table>
          <tbody>
            <tr>
              <th></th> 
              <th></th> 
              <th> Oro | <br/></th> 
              <th> Plata | <br/></th> 
              <th> Bronce | <br/></th> 
              <th> Total <br/></th>
            </tr>
          </tbody>
          {
            countries.map(country => {
              const { medals:[ { gold, silver, bronze } ]} = country;
              return (
                <tbody key={country.id}>
                  <tr>
                    <th>{country.flag}</th>
                    <th>&nbsp;{country.name}</th>
                    <th>{gold}</th>
                    <th>{silver}</th>
                    <th>{bronze}</th>
                    <th>{gold + silver + bronze}</th>
                  </tr>
                </tbody>
              )
            })
          }
        </table>
      </section>
    </div>
  );
}

export default App;
