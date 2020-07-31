import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './component/Navbar'
import Pokedex from './component/Pokedex'
import PokemonTeam from './component/PokemonTeam'
import LoginPage from './component/LoginPage'
import RegisterPage from './component/RegisterPage'
import {BrowserRouter as Router, Switch, Route} from  'react-router-dom'
import BackendAPIService from './component/BackendAPIService'

function App() {
  const [token, setToken] = useState(localStorage.getItem('poke-jwt'))
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)

    useEffect(() => {
        let mounted = true
        BackendAPIService.getUser(token)
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            setLoggedIn(true)
            setUser(response.name)
          })
          .catch(response => {
            setLoggedIn(false)
          } )
    
          return function cleanup() {
            mounted = false
          }
      }, [token])

  const logout = () => {
    localStorage.removeItem('poke-jwt', token)
    setLoggedIn(false)
    setUser('')
  }


  return (
    <Router>
      {loading ? <p>loading...</p> :
      <div className="App">
        <Navbar loggedIn={loggedIn} user={user} logout={logout}/>
        <Switch>
          <Route path="/" exact>
             <Pokedex token = {token} loggedIn = {loggedIn}/>
             </Route>
          <Route path="/team">
          {loggedIn ?  <PokemonTeam token={token}/> : <p>Please log in to continue.</p>}
          </Route>
          <Route path="/login">
            <LoginPage setToken={setToken}/>
          </Route>
          <Route path="/register">
            <RegisterPage setToken={setToken}/>
          </Route>
        </Switch>
      </div>}
    </Router>
  );
}

export default App;
