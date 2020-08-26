import React from 'react'


export default function Chatitem(props) {
    return (

        <div className="messages">
            <li className="message left appeared" >
                <div className="avatar"></div>
                <div className="text_wrapper">
                <div className="text" >{props.name}</div>
                    <div></div>
                    {props.message}
                </div>
            </li>
            <li className="message right appeared" >
            <div className="avatar"></div>
                <div className="text_wrapper">
                    <div className="text" >{props.name}</div>
                    <div></div>
                    {props.message}
                </div>
                {!props.sent && <p style={{ color: 'red', 'font-size': '8pt' }}>network failed</p>}
                <button className="btn btn-danger" onClick={props.sent ? props.hapus : props.resend}>{props.sent ? 'hapus' : 'kirim ulang'}</button>
            </li>
        </div>

    )
}