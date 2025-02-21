import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import BackendAPIService from './BackendAPIService'
import { Redirect } from 'react-router-dom'
import App from '../App'


export default function LoginPage({setToken}) {
    const [user, setUser] = useState({name: '', password: ''})
    const [invalid, setInvalid] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)


    const handleNameChange = (event) => {
        setUser({name: event.target.value, password: user.password})
      }
    const handlePasswordChange = (event) => {
        setUser({name: user.name, password: event.target.value})
    }

    const submitUserDetails = (event) => {
        event.preventDefault()
        BackendAPIService.login(user.name, user.password)
        .then(res => {
            localStorage.setItem('poke-jwt', res.token)
            setToken(res.token)
            setLoggedIn(true)
            
        })
        .catch( res => {
            setInvalid(true)
        })
    }

    return (
        <div className="container">
        <div>
            {loggedIn ? <Redirect to="/" component={App}/> : <div/>}
            <h2>Login</h2>
            {invalid ? <div>invalid credentials</div> : <div />}
            <form onSubmit= {event => submitUserDetails(event)}>
                <div className="row">
                <label>name</label><input type = "text" name= "name" onChange={handleNameChange}/>
                </div>
                <div className="row">
                <label>password</label><input type = "password" name= "password" onChange={handlePasswordChange}/>
                </div>
                <div className="row">
                <Button variant="primary" className="mr-2" type="submit">Submit</Button>
                </div>
            </form>
        </div>
        </div>
    )
}
