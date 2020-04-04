import React , { Component } from 'react'

import { withTracker } from 'meteor/react-meteor-data';
import { Chats } from '../api/chats.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import ChatList from './ChatList'
import NewChatForm from './NewChatForm'


class App extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            chatId: null,
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.createChat = this.createChat.bind(this);
        this.enterChat = this.enterChat.bind(this);
        this.deleteChat = this.deleteChat.bind(this);
    }     
    
    enterChat(chatId) {   
      this.setState({ 
        chatId
      })        
    }
    
    sendMessage(text) {
      Meteor.call('chats.pushMessage', this.state.chatId, text);    
      
      let body = $(".message-list");console.log(body[0].scrollTop);
      
      body.stop().animate({scrollTop:body[0].scrollTop+450}, 750, 'swing')
    }
    
    createChat(name) {      
      Meteor.call('chats.insert', name);  
    }

    deleteChat(chatId) {
      Meteor.call('chats.remove',chatId);
    }
    
    render() {
        return (
            <div className="app">                
              <ChatList
                  enterChat={this.enterChat}
                  chats={[...this.props.chats]}
                  chatId={this.state.chatId} />
              { this.props.userName ?
                <MessageList 
                  chatId={this.state.chatId}
                  chats={[...this.props.chats]}
                  messages={this.state.messages} />: 
                <AccountsUIWrapper />
              }
              <SendMessageForm
                  disabled={!this.state.chatId}
                  sendMessage={this.sendMessage} />
              <NewChatForm createChat={this.createChat} />
              {/* <AccountsUIWrapper /> */}
            </div>
        );
    }
}

export default withTracker(() => {
  Meteor.subscribe('chats');
  return {
    chats: Chats.find({}).fetch(),
    userName:Meteor.user()?Meteor.user().username:'',
  };
})(App);