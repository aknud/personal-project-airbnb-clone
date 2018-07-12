import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';



export default class Nav extends React.Component {

    render() {
        return (
            <nav>
                <Link to='/' className="logo_link"><i className="fas fa-globe-americas"></i></Link>
                <div className="nav_links">
                    <Link to='/login'>Sign Up</Link>
                </div>
                <div className="nav_links">
                    <Link to='/login'>Login</Link>
                </div>
            </nav>
        )
    }
}