import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageList extends React.Component {
    
    // componentWillUpdate() {
    //     const node = ReactDOM.findDOMNode(this)
    //     this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    // }
    
    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight   
        }
    }
    
    render() {
        const chatId = this.props.chatId;
        if (!chatId) {
            return (
                <div className="message-list">
                    <div className="join-chat">
                        &larr; Join a chat!
                    </div>
                </div>
            )
        }
        const chat = this.props.chats.find(chat => chat._id === chatId)
        return (
            <div className="message-list">        
                <div className="fadedScroller"></div>        
                {chat.messages.map((message, index) => {
                    return (
                        <Message key={index} name={message.name} text={message.text} />
                    )
                })}                
            </div>
        )
    }
}

export default MessageList