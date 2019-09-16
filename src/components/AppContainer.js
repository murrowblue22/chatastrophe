import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as firebase from 'firebase/app'; 
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/messaging"; 
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';
import NotificationResource from '../resources/NotificationResource';
import '../secrets';
import '../css/app.css';





class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            user: null,
            messages: [], 
            messagesLoaded: false
        };

        var firebaseConfig = {
            apiKey: apiKey,
            authDomain: "chatastrophe-e0c3f.firebaseapp.com",
            databaseURL: "https://chatastrophe-e0c3f.firebaseio.com",
            projectId: "chatastrophe-e0c3f",
            storageBucket: "",
            messagingSenderId: messagingSenderId,
            appId: "1:735835007746:web:3e323e5753b64f8863301b"
        };

        firebase.initializeApp(firebaseConfig);

    }

    componentDidMount() {
        this.notifications = new NotificationResource(firebase.messaging(), firebase.database());
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user }); 
                //this.listenForMessages();
                this.notifications.changeUser(user);
            } else {
                this.props.history.push('/login');
            }
        });

        firebase.database().ref('/messages')
            .on('value', snapshot => {
               this.onMessage(snapshot); 
               if (!this.state.messagesLoaded) {
                   this.setState({ messagesLoaded: true });
               }
            });
    }

    onMessage = snapshot => {
        const messages = Object.keys(snapshot.val()).map(key => {
            const msg = snapshot.val()[key];
            msg.id = key; 
            return msg;
        });
        this.setState({ messages });
    }

    handleSubmitMessage = msg => {
        const data = {
            msg, 
            author: this.state.user.email,
            user_id: this.state.user.uid,
            timestamp: Date.now()
        };
        firebase.database().ref('messages/').push(data); 
    }; 

    render() {
        return (
            <div id="container">
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/" 
                    render={ () =>
                         <ChatContainer 
                            messagesLoaded={this.state.messagesLoaded}
                            onSubmit={this.handleSubmitMessage} 
                            user={this.state.user}
                            messages={this.state.messages}    
                        /> }
                />
                <Route path="/users/:id" 
                    render={ ( { match } ) => 
                               <UserContainer 
                                messages = {this.state.messages}
                                messagesLoaded = {this.state.messagesLoaded} 
                                userID = {match.params.id}
                            /> 
                    }   
                />
            </div>
        );
    }

}

export default withRouter(App);