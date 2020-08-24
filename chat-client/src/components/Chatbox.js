import React from 'react'
import Chatform from './Chatform'
import Chatlist from './Chatlist'
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: {}
});

export default class Chatbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = { data: [] }
        this.addChat = this.addChat.bind(this)
        this.removeChat = this.removeChat.bind(this)
        this.resendChat = this.resendChat.bind(this)
    }


  
    componentDidMount() {
        request.get('chats').then(data => {
            const completeData = data.data.map(item => {
                item.sent = true;
                return item
            })
            console.log(completeData)
            this.setState({ data: completeData })
        }).catch(err => {
            console.log(err)
        })
    }


    addChat(name, message) {
        const id = Date.now()
        this.setState((state, props) => ({
            data: [...state.data, { id, name, message, sent: true }]
        }));
        request.post('chats', {
            id,
            name,
            message
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
            this.setState((state, props) => ({
                data: state.data.map(item => {
                    if (item.id === id) {
                        item.sent = false;
                    }
                    return item;
                })
            }));
        })
    }

    removeChat(id) {
        this.setState((state, props) => ({
            data: state.data.filter(item => item.id !== id)
        }));
    }

    resendChat(id, name, message) {
        request.post('chats', {
            id,
            name,
            message
        }).then(data => {
            this.setState((state, props) => ({
                data: state.data.map(item => {
                    if (item.id === id) {
                        item.sent = true;
                    }
                    return item;
                })
            }));
        }).catch(err => {
            console.log(err)
        })
    }


    render() {
        return (
            <div>
                <Chatlist data={this.state.data} remove={this.removeChat}  resend={this.resendChat}  />
                <Chatform add={this.addChat} />
            </div>

        )
    }
}