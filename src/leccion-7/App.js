import React, { useEffect, useState } from 'react';
import './App.css';

const URL = 'http://localhost:4000/countries';

function App() {
  const [countries, setCountries] =  useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [ isEditMedals, setIsEditMedal ] = useState({ showForm: false, country: null })
  const [onChangeMedal, setOnChangeMedal] = useState({ gold: '', silver: '', bronze: ''});

  useEffect(() => {
    const fetchCountries = async() => {
      try {
        const response = await fetch(URL);
        const countries = await response.json();
        const sortCountries = await countries.sort((a,b) => {
          return b.medals[0].gold - a.medals[0].gold;
        })
  
        setCountries(sortCountries);
        setIsLoading(false);
      } catch(e) {
        setIsError(true);
      }
    }
    fetchCountries();
  }, []);

  const editMedals = (country) => {
    const { medals: [{ gold, silver, bronze }]} = country;
    
    setIsEditMedal({ showForm: true, country});
    setOnChangeMedal({ gold, silver, bronze });
  }

  const handleInpuChange = (event, keyName) => {
    event.persist();
    setOnChangeMedal((onChangeMedal) => {
      return {...onChangeMedal, [keyName]: event.target.value }
    })
  }

  if(isError) {
    return (
      <div className="App App-container">
        <p style={{color: '#fff'}}>...Algo malo ocurrio</p>
      </div>
    )
  }

  if(isLoading) {
    return (
      <div className="App App-container">
        <p style={{color: '#fff'}}>...Loading</p>
      </div>
    )
  }

  return (
    <div className="App-container">
      <h3>Cuadro de medallas</h3>
      <section>
        <table width="800" border="1" cellSpacing="1" cellPadding="1">
          <tbody>
            <tr className="medals-col">
              <th></th> 
              <th></th> 
              <th> Oro <br/></th> 
              <th> Plata <br/></th> 
              <th> Bronce <br/></th> 
              <th> Total <br/></th>
            </tr>
          </tbody>
          {
            countries.map(country => {
              const { medals:[ { gold, silver, bronze } ] } = country;
              return (
                <tbody key={country.id}>
                  <tr>
                    <th>{country.flag}</th>
                    <th 
                      onClick={() => editMedals(country)}
                      className="edit-medal"
                    >
                      {country.name}
                    </th>
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
        <div className="medal-form-container">
          {
            isEditMedals.showForm &&
            <>
              <div className="country-selected-wrapper">
                <span>{isEditMedals.country.flag}</span>
                <p>{isEditMedals.country.name}</p>
              </div>
              <form className="medal-form">
                <div className="update-container">
                  <label htmlFor="">Oro:</label>
                  <input 
                    type="text"
                    className="medal-input"
                    value={onChangeMedal.gold}
                    onChange={(event) => handleInpuChange(event, 'gold')}
                  />
                </div>
                <div className="update-container">
                  <label htmlFor="">Plata:</label>
                  <input 
                    type="text" 
                    className="medal-input"
                    value={onChangeMedal.silver}
                    onChange={(event) => handleInpuChange(event, 'silver')}
                  />
                </div>
                <div className="update-container">
                  <label htmlFor="">Bronce:</label>
                  <input 
                    type="text" 
                    className="medal-input"
                    value={onChangeMedal.bronze}
                    onChange={(event) => handleInpuChange(event, 'bronze')}
                  />
                </div>
                <div className="update-container">
                  <button className="update-btn">
                    Actualizar
                  </button>
                  <button className="cancel-btn">
                    Cancelar
                  </button>
                </div>
              </form> 
            </>
          }
        </div>
      </section>
    </div>
  );
}

export default App;
