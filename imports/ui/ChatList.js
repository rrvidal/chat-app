import React from 'react'

class ChatList extends React.Component {
    render () {
        return (
            <div className="chats-list">
                <ul>
                <h3>Your Chats:</h3>
                    {this.props.chats.map(chat => {
                        const active = chat._id === this.props.chatId ? 'active' : '';
                        return (
                            <li key={chat._id} className={"chat " + active}>
                                <a
                                    onClick={() => this.props.enterChat(chat._id)}
                                    href="#">
                                    {chat.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ChatList