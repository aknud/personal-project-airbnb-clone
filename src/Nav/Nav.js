import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';


export default class Nav extends React.Component {
    constructor() {
        super();

        this.state = {
            search: ''
        }
    }

    searchHandler = (val) => {
        this.setState({
            search: val
        })
    }
    clearState = () => {
        this.setState({
            search: ''
        })
    }

    render() {
        console.log(this.state)
        return (
            <nav>
                <Link className="logo_link" to='/'><div className="logo">LOGO</div></Link>
                <div>
                    <input type="text" onChange={e => this.searchHandler(e.target.value)}
                        value={this.state.search} />
                    <button onClick={() => this.clearState()}>Search</button>
                </div>
                <Link replace to='/login' ><button>Login or Signup</button></Link>
                <button>Become a Host</button>
            </nav>
        )
    }
}