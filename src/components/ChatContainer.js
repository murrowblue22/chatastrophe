import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Header';
import { timingSafeEqual } from 'crypto';


export default class ChatContainer extends Component {
    constructor(props) {
        super(props); 

        this.state = { newMessage: ''};
        this.firebase = this.props.firebaseRef; 

        this.user = this.firebase.auth().currentUser; 
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate(previousProps) {
        if (previousProps.messages.length !== this.props.messages.length) {
            this.scrollToBottom(); 
        }
    }

    scrollToBottom = () => {
        const messageContainer = ReactDOM.findDOMNode(this.messageContainer); 
        if(messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight; 
        }
    }

    handleLogout = () => {
        this.firebase.auth().signOut();
    };

    handleInputChange = e => {
        this.setState({ newMessage: e.target.value }); 
    }

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        
        this.props.onSubmit(this.state.newMessage); 
        this.setState({ newMessage: ''});
    }

    getUser() {

        if (this.props.user !== null) {
            return this.props.user; 
        }

        if (this.user !== null) {
            return this.user; 
        }

        return null; 
    }

    getAuthor = (msg, nextMsg) => {
        if(!nextMsg || nextMsg.author !== msg.author) {
            return (
                <p className="author">
                    <Link to={`/users/${msg.user_id}`}>
                        {msg.author}
                    </Link>
                </p>
            )
        }
    }

    render() {
        return (
            <div id="ChatContainer" className="inner-container">
                <Header>
                    <button className="red" onClick={this.handleLogout}>
                        Logout
                    </button>
                </Header>
                {
                    this.props.messagesLoaded ? (
                        <div id="message-container" ref={ element => this.messageContainer = element }>
                        {
                            this.props.messages.map((msg, i) => (
                               (this.getUser() !== null) ? (
                                    <div key={msg.id} className={`message ${this.getUser().email === msg.author && 'mine'}`}>
                                        <p>{msg.msg}</p>
                                        {this.getAuthor(msg, this.props.messages[i + 1])}
                                    </div>
                               ) :
                               (
                                    <div key={msg.id} className="message">
                                        <p>{msg.msg}</p>
                                        {this.getAuthor(msg, this.props.messages[i + 1])}
                                    </div>
                               )  
                            ))
                        }
                        </div>
                    ) 
                    : ( 
                        <div id="loading-container">
                            <img src="img/icon.png" alt="logo" id="loader" />
                        </div>
                    )  
                }
                <div id="chat-input">
                    <textarea 
                        placeholder="Add your message..." 
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.newMessage}
                    />
                    <button onClick={this.handleSubmit}>
                        <svg viewBox="0 0 24 24">
                            <path fill="#424242" d="M2, 21L23, 12L2, 3V10L17, 12L2, 14V21Z" />
                        </svg>
                    </button>
                </div>
            </div>
        ); 
    }
}