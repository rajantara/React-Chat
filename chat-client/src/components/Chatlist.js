import React from 'react'
import Chatitem from './Chatitem'

export default function Chatlist(props) {
    const chatli = props.data.map(item =>
        <Chatitem
            key = {item.id}
            name={item.name}
            message={item.message}
            sent={item.sent}
            resend={() => props.resend(item.id, item.name, item.message)}
            hapus={() => props.remove(item.id)}
        />)

    return (
        <ul>{chatli}</ul>
    )
}