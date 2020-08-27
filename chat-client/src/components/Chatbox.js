import React, { Component } from 'react';
import Chatform from './Chatform'
import Chatlist from './Chatlist'
import io from 'socket.io-client'
import axios from 'axios'




var socket = io.connect('http://localhost:3001/')

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: {'token': 'chatboxx'}
});

export default class Chatbox extends Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
        this.addChat = this.addChat.bind(this)
        this.removeChat = this.removeChat.bind(this)
        this.resendChat = this.resendChat.bind(this)
    }



    componentDidMount() {
        this.loadChat()

        socket.on('chat', function (data) {
            console.log(data)
            this.setState((state, props) => (
                {data: [...state.data, { ...data, sent: true }]
            }))
        }.bind(this))


        socket.on('delete-chat-frontend', function (id) {
            console.log(id)
            this.setState((state, props) => ({
                data: state.data.filter(item => {
                    return item.id !== id.id
                })
            }))
        }.bind(this))

        
    }


    //load chat front end
    loadChat(){
        request.get('chats').then(data => {
            const completeData = data.data.map(item => {
                item.sent = true;
                return item
            })
            console.log(completeData)
            this.setState({ data: data.data})
        }).catch(err => {
            console.log('error dude',err)
        })

    }





    addChat(name, message) {
        const id = Date.now()
        this.setState((state, props) => ({
            data: [...state.data, { id, name, message, sent: true }]
        }));

        socket.emit('chat', {
            id,
            name,
            message
        })


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

        socket.emit('delete chat backend', {
            id
        })
        
        //delete beckend chat
        request.delete(`chats/${id}`).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }




    resendChat(id, name, message) {
        request.post('chats', {
            id,
            name,
            message
        }).then(data => {
            console.log(data)
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
            <div className="chat_window">
                <div className="top_menu">
                    <div className="buttons">
                        <div className="button close" />
                        <div className="button minimize" />
                        <div className="button maximize" />
                    </div><div className="title">🆁🅴🅰🅲🆃 🅲🅷🅰🆃</div>
                </div>
                <ul className="messages">
                    <Chatlist data={this.state.data} remove={this.removeChat} resend={this.resendChat} />
                </ul>
                    <Chatform add={this.addChat} />
            </div>

        )
    }
}