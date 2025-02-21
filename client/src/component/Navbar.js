import React from 'react'
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function Navbar({loggedIn, user, logout}) {
    return ( 
        <header className="header">
        <nav className="nav">
            <ul className="nav-links">
                <Link to="/">
                <li>Pokedex</li>
                </Link>

                <Link to="/team">
                <li>Team</li>
                </Link>
            </ul>
            </nav>
        
            <div style={{display: 'flex'}}>
        {loggedIn ? <div className="navright" ><p>Welcome, {user}</p><div style={{margin: '5%'}}><Button variant="secondary" onClick={() => logout()}>Logout</Button></div></div> : 
        <div className="navright">
            <div>
            <Link to="/login">
            <div><Button variant="secondary" className="mr-2">Login</Button></div>
            </Link>
            </div>

            <div>
            <Link to="/register">
            <div><Button variant="secondary" className="mr-2">Register</Button></div>
            </Link></div></div>}</div>

        </header>
    )
}
