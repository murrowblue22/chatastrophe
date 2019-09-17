import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';

class LoginContainer extends Component {
    
    constructor(props) {
        super(props);

        this.state = { email: '',
                    password: '', 
                    error: ''
        };

        this.firebase = this.props.firebaseRef; 
    }
   
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };
    
    login() {
        this.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => this.onLogin())
            .catch(err => { 
                if (err.code === 'auth/user-not-found') {
                    this.signup();
                } 
                else {
                    this.setState({ error: err});
                }
            }); 
    }

    signup() {
        this.firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                this.onLogin();
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: 'Error signing up.' });
            });
    }

    onLogin() {
        this.props.history.push('/');
    }

    handleSubmit = (event) => {
       event.preventDefault(); //prevents the form from submitting
       this.setState({ error: ''});
       if (this.state.email && this.state.password) {
            this.login();
       }
       else {
           this.setState({ error: 'Please fill in both fields' });
       }

    };

    render () {
        return (
            <div id="LoginContainer" className="inner-container">
                <Header />
                <form onSubmit={this.handleSubmit}>
                    <p>Sign in or sign up by entering your email and password</p>
                    <input type="text" onChange={this.handleEmailChange} placeholder="Your email" value={this.state.email} />
                    <input type="password" onChange={this.handlePasswordChange} placeholder="Your password" value={this.state.password} />
                    <p className="error">{this.state.error}</p>
                    <button className="red light" type="submit">Login</button>
                </form >
            </div>
        );
    }
}

export default withRouter(LoginContainer); 

