import React from 'react'
import Message from './Message'

const Messages = ({messages, toggleSelect, toggleStar}) => (
// messages will take the same function as in message
<div>
{messages.map(message => <Message key={message.id} message={message} toggleSelect={toggleSelect} toggleStar={toggleStar}/>)}
</div>

)


export default Messages
