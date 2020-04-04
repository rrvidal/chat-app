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
        if (!this.props.chatId) {
            return (
                <div className="message-list">
                    <div className="join-chat">
                        &larr; Join a chat!
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">        
                <div className="fadedScroller"></div>        
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={index} name={message.name} text={message.text} />
                    )
                })}                
            </div>
        )
    }
}

export default MessageList