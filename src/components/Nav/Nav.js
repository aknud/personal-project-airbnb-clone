import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';


export default class Nav extends React.Component {
   
    render() {
        return (
            <nav>
                <Link className="logo_link" to='/'><div className="logo">LOGO</div></Link>
                <Link replace to='/login' ><span>GET STARTED</span></Link>
                <Link to='/newlisting' ><span></span></Link>

            </nav>
        )
    }
}