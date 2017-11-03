import React from 'react'
import Message from './Message'

const Messages = ({messages}) => (

<div>
{messages.map(message => <Message key={message.id} message ={message}/>)}
</div>
)


export default Messages
