import React from 'react'


export default function Chatitem(props) {
    return (

        <div>
            <li className="message" >
                <h3 >{props.name}</h3>
                <div>{props.message}</div>
                {!props.sent && <p style={{ color: 'red', 'font-size': '8pt' }}>network failed</p>}
                <button className="btn btn-danger" onClick={props.sent ? props.hapus : props.resend}>{props.sent ? 'hapus' : 'kirim ulang'}</button>
            </li>
        </div>

    )
}