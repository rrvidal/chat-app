import React from 'react'

class NewChatForm extends React.Component {
    
    constructor() {
        super()
        this.state = {
            chatName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            chatName: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.createChat(this.state.chatName)
        this.setState({chatName: ''})
    }
    
    render () {
        return (
            <div className="new-chat-form">
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.chatName}
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Create a chat" 
                        required />
                    <button id="create-chat-btn" type="submit">+</button>
            </form>
        </div>
        )
    }
}

export default NewChatForm