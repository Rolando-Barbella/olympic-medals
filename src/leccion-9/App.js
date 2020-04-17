import React, { useEffect, useState } from 'react';
import UseFecthCountries from './hooks/UseFetchCountries';
import './App.css';

const URL = 'http://localhost:4000/countries';

function App() {
  const [{ countries, isLoading, isError }, fetchCountries ] = UseFecthCountries();
  const [ isEditMedals, setIsEditMedal ] = useState({ showForm: false, country: null })
  const [onChangeMedal, setOnChangeMedal] = useState({ gold: '', silver: '', bronze: ''});
  const [didMedalUpdate, setDidMedalUpdate] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, [didMedalUpdate, fetchCountries]);

  const handleInpuChange = (event, keyName) => {
    event.persist();
    setOnChangeMedal((onChangeMedal) => {
      return {...onChangeMedal, [keyName]: event.target.value }
    })
  }

  const updateMedals = async (id, country) => {
    setDidMedalUpdate(false);
    const response = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(country)
    });
    await response.json();
    await setDidMedalUpdate(true);
  };

  const onSubmitMedals = ((event, { country }, newMedals)=> {
    const { gold, silver, bronze } = newMedals;
    
    updateMedals(country.id, {
      ...country, medals:[ {
        gold: parseInt(gold),
        silver: parseInt(silver),
        bronze: parseInt(bronze),
      }]
    });
    event.preventDefault();
  });

  if(isError) {
    return (
      <div className="App App-container">
        <p style={{color: '#fff'}}>...Algo malo ocurrio</p>
      </div>
    )
  }

  if(isLoading) {
    return <p>...Loading</p>
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
                      onClick={() => setIsEditMedal({ showForm: true, country })}
                      className="edit-medals"
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
            isEditMedals.showIsForm &&
            <>
              <div className="country-selected-wrapper">
                <span>{isEditMedals.flag}</span>
                <p>{isEditMedals.name}</p>
              </div>
              <form 
                className="medal-form"
                onSubmit={(event) => onSubmitMedals(event, state.isEditMedals, onChangeMedal)}
              >
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
