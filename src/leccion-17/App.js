import React, { useState, useEffect, useReducer } from 'react';
import UseFecthCountries from './hooks/UseFetchCountries';
import Title from './components/Title';
import Message from './components/Messages';
import Button from './components/Buttons';
import './App.css';

const URL = 'http://localhost:4000/countries';

const medalReducer = (state, action) => {
  switch(action.type) {
    case 'EDIT_MEDALS':
      return {
        ...state,
        isEditMedals: action.payload,
      }
    default:
      throw new Error();
  }
};

function App() {
  const [{ countries, isLoading, isError }, fetchCountries ] = UseFecthCountries();
  const [onChangeMedal, setOnChangeMedal] = useState({ gold: '', silver: '', bronze: ''});

  const [state, dispatch] = useReducer(medalReducer, {
    isEditMedals:{ 
      showForm: false, 
      country: null, 
      didMedalUpdate: false,
      id: null,
    }
  });

  useEffect(() => {
    fetchCountries();
  }, [state.isEditMedals.didMedalUpdate, fetchCountries]);

  const editMedals = (country) => {
    const { medals: [{ gold, silver, bronze }]} = country;
    
    dispatch({ type: 'EDIT_MEDALS', payload:{ showForm: true, country, didMedalUpdate: false }});
    setOnChangeMedal({ gold, silver, bronze })
  }

  const handleInpuChange = (event, keyName) => {
    event.persist();
    setOnChangeMedal((onChangeMedal) => {
      return {...onChangeMedal, [keyName]: event.target.value }
    })
  }

  const updateMedals = async(id, country) => {
    const response = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(country)
    })

    await response.json();
    await dispatch({ 
      type: 'EDIT_MEDALS', 
      payload:{ 
        showForm: false, 
        didMedalUpdate: true,
        id
      } 
    });
  }

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

  const cancelUpdate = () =>  
    dispatch({ type: 'EDIT_MEDALS', payload:{ 
      showForm: false, 
      didMedalUpdate: false 
    } 
  });

  if(isError) {
    return (
      <Message text="...Algo malo ocurrio" />
    )
  }

  if(isLoading) {
    return (
      <Message text="...Cargando" />
    )
  }
  return (
      <div className="App-container">
        <Title text="Cuadro de medallas"/>
        <section>
          <table width="800" border="1" cellPadding="1" cellSpacing="1">
            <tbody>
              <tr>
                <th></th>
                <th></th>
                <th>Oro <br/></th>
                <th>Plata <br/></th>
                <th>Bronce <br/></th>
                <th>Total</th>
              </tr>
            </tbody>
            {
              countries.map(country => {
                const { medals: [{ gold, silver, bronze }], id } = country
                return (
                  <tbody 
                    key={country.id}
                    className={state.isEditMedals.id === id ? 'country-update' : ''}
                  >
                    <tr>
                      <th>{country.flag}</th>
                      <th 
                        onClick={() => editMedals(country)}
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
            state.isEditMedals.showForm &&
            <>
              <div className="country-selected-wrapper">
                <span>{state.isEditMedals.country.flag}</span>
                <p>{state.isEditMedals.country.name}</p>
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
                  <Button 
                    type="primary" 
                    text="Actualizar"
                    styles={{ marginRight: 10 }}
                  />
                </div>
                <div className="update-container">
                  <Button
                    type="default"
                    onClick={cancelUpdate}
                    text="Cancelar"
                  />
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
