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
      const sortCountries = await countries.sort((a,b) => b.medals[0].gold - a.medals[0].gold);

      setCountries(sortCountries);
      setIsLoading(false)
    }
    fetchCountries();
  },[]);

  if(isLoading) {
    return <p>...Loading</p>
  }

  return (
    <div className="App-container">
      <h3>Cuadro de medallas</h3>
      <section>
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
