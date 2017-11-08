import React from 'react'
import Message from './Message'

const Toolbar = ({messages, markAsRead, markAsUnread, toggleSelectAll, deleteMessages, applyLabel, removeLabel})=> {
const unreadCount = messages.filter(message => !message.read).length
const selectedCount = messages.filter(message => message.selected).length
let allClasses

switch(selectedCount){
case 0:
  allClasses = 'fa-square-o'
  break;
case messages.length:
  allClasses = 'fa-check-square-o'
  break;
default:
  allClasses = 'fa fa-minus-square-o'
}


return (

<div>
  <div className ="row toolbar">
    <div className ="col-md-12 ">
      <p className ="pull-right">
        <span className="badge badge">2</span>
        unread messages
      </p>

      <a className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

      <button className="btn btn-default" onClick={toggleSelectAll}>
        <i className ={`fa ${allClasses}`}></i>
      </button>

      <button className="btn btn-default" onClick={markAsRead} disabled={selectedCount === 0}>
        Mark As Read
      </button>

      <button className="btn btn-default" onClick={markAsUnread} disabled={selectedCount === 0}>
        Mark As Unread
      </button>

      <select className="form-control label-select" disabled={selectedCount===0} onChange={(e) => {applyLabel(e.target.value); e.target.selectedIndex = 0}}>
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select className="form-control label-select" disabled={selectedCount===0} onChange={(e) => {removeLabel(e.target.value); e.target.selectedIndex = 0}}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <button className="btn btn-default" onClick={deleteMessages} disabled={selectedCount === 0}>
        <i className ="fa fa-trash-o"></i>
      </button>
    </div>
  </div>
  </div>
 )
}

export default Toolbar
