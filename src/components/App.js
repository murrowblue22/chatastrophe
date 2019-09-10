import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import '../css/app.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = { user: null };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user }); 
            } else {
                this.props.history.push('/login');
            }
        });
    }

    render() {
        return (
            <div id="container" >
                <Route exact path="/" component={ChatContainer} />
                <Route exact path="/login" component={LoginContainer} />
            </div>
        );
    }


}

export default withRouter(App);