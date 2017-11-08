import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Message from './components/Message'
import Messages from './components/Messages'
import Toolbar from './components/Toolbar'

// const messages = [
//   {
//     "id": 1,
//     "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
//     "read": false,
//     "starred": true,
//     "labels": ["dev", "personal"]
//   },
//   {
//     "id": 2,
//     "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
//     "read": false,
//     "starred": false,
//     // "selected": false,
//     "labels": []
//   },
//   {
//     "id": 3,
//     "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
//     "read": false,
//     "starred": true,
//     "labels": ["dev"]
//   },
//   {
//     "id": 4,
//     "subject": "We need to program the primary TCP hard drive!",
//     "read": false,
//     "starred": false,
//     // "selected": false,
//     "labels": []
//   },
//   {
//     "id": 5,
//     "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
//     "read": false,
//     "starred": false,
//     "labels": ["personal"]
//   },
//   {
//     "id": 6,
//     "subject": "We need to back up the wireless GB driver!",
//     "read": false,
//     "starred": true,
//     "labels": []
//   },
//   {
//     "id": 7,
//     "subject": "We need to index the mobile PCI bus!",
//     "read": false,
//     "starred": false,
//     "labels": ["dev", "personal"]
//   },
//   {
//     "id": 8,
//     "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
//     "read": false,
//     "starred": true,
//     "labels": []
//   }
// ]

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {messages:[]}
    console.log("this is the state" , this.state);
  }

  async componentDidMount() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const json = await res.json()
    this.setState({messages: json._embedded.messages})
    console.log("this is the new state", this.setState);
  }


  // addItem = async (item) => {
  //   const url = `${process.env.REACT_APP_API_URL}/hoard`
  //   const opts = {
  //     method: 'POST',
  //     body: JSON.stringify(item),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   }
  //   await fetch(url, opts)
  //   const getRes = await fetch(`${process.env.REACT_APP_API_URL}/hoard`)
  //   const items = await getRes.json()
  //   this.setState({
  //     ...this.state,
  //     items: items,
  //     currentItem: -1
  //   })
  // }


    toggleProperty(message, property) {
      const index = this.state.messages.indexOf(message)
        this.setState({
          messages: [
            ...this.state.messages.slice(0, index),
            { ...message, [property]: !message[property] },
            ...this.state.messages.slice(index + 1),
          ]
        })
    }

    toggleSelect(message) {
        this.toggleProperty(message, 'selected')
    }

    toggleStar(message){
      this.toggleProperty(message, 'starred')
    }

    markAsRead(){
      this.setState({
        messages:this.state.messages.map(message =>(
          message.selected ? { ...message, read:false } : message
        ))
      })
    }

    markAsUnread(){
      this.setState({
        messages:this.state.messages.map(message =>(
          message.selected ? { ...message, read:true } : message
        ))
      })
    }

    toggleSelectAll(){
      const selectedMessages = this.state.messages.filter(message => message.selected)
       const selected = selectedMessages.length !== this.state.messages.length
       this.setState({
         messages: this.state.messages.map(message => (
           message.selected !== selected ? { ...message, selected } : message
         ))
       })
    }

    applyLabel(label) {
         const messages = this.state.messages.map(message => (
           message.selected && !message.labels.includes(label) ?
             { ...message, labels: [...message.labels, label].sort() } :
             message
         ))
         this.setState({ messages })
    }

    removeLabel(label) {
    const messages = this.state.messages.map(message => {
      const index = message.labels.indexOf(label)
      if (message.selected && index > -1) {
        return {
          ...message,
          labels: [
            ...message.labels.slice(0, index),
            ...message.labels.slice(index + 1)
          ]
        }
      }
      return message
    })
    this.setState({ messages })
  }

    deleteMessages(){
      const messages = this.state.messages.filter(message => !message.selected)
      this.setState({ messages })
    }

  render() {
    // console.log(this.state);
    return (
      <div className= "container">
      <Toolbar messages = {this.state.messages}
      markAsRead={this.markAsRead.bind(this)}
      markAsUnread={this.markAsUnread.bind(this)}
      toggleSelectAll={this.toggleSelectAll.bind(this)}
      applyLabel={this.applyLabel.bind(this)}
      removeLabel={this.removeLabel.bind(this)}
      deleteMessages={this.deleteMessages.bind(this)}/>
      <Messages messages={this.state.messages}
      toggleSelect={this.toggleSelect.bind(this)}
      toggleStar={this.toggleStar.bind(this)}/>
      </div>
    );
  }
}


export default App;
