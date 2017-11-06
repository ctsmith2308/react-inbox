import React from 'react'
import Messages from './Messages'


const Message = ({message, toggleSelect, toggleStar}) => {
  const readClass = message.read ? 'read' : 'unread'
  const selectedClass = message.selected ? 'selected' : ""
  const starredClass = message.starred ? 'fa-star': 'fa-star-o'

  const starMessage = (e) => {
   e.stopPropagation()
   toggleStar(message)
 }

return (

  <div className={`row message ${readClass} ${selectedClass}`} onClick={() => toggleSelect(message)}>
  <div className="col-xs-1">
    <div className="row">
      <div className="col-xs-2">
        <input type="checkbox" checked={!!message.selected}  readOnly={true} />
      </div>
      <div className="col-xs-2" onClick={starMessage}>
        <i className={`star fa ${starredClass}`}></i>
      </div>
    </div>
  </div>
  <div className="col-xs-11">
    <a href="#">{message.subject}</a>
  </div>
</div>
  )
}

export default Message
