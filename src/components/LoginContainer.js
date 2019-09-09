import React, { Component } from 'react';
import Header from './Header';

class LoginContainer extends Component {
    
    constructor(props) {
        super(props);

        this.state = { email: '', password: ''};
    }
   
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ password})
    };
    
    handleSubmit = (event) => {
        event.preventDefault(); //prevents the form from submitting
        console.log(this.state);

    };

    render () {
        return (
            <div id="LoginContainer" className="inner-container">
                <Header />
                <form onSubmit={this.handleSubmit}>
                    <p>Sign in or sign up by entering your email and password</p>
                    <input type="text" onChange={this.handleEmailChange} placeholder="Your email" value={this.state.email} />
                    <input type="password" onChange={this.handlePasswordChange} placeholder="Your password" value={this.state.password} />
                    <button className="red light" type="submit">Login</button>
                </form >
            </div>
        );
    }
}

export default LoginContainer; 

