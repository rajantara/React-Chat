import React from 'react'
import moment from 'moment';
import ReactMarkdown from 'react-markdown';


function dateConvert(date){
    if(date === moment().format('YYYY-MM-DD')){
          return date = 'today'
    } else if (date === moment().subtract(1, 'days').format('YYYY-MM-DD')){
          return date = 'yesterday'
    } else { 
          return date = moment(date).format('MMM Do, YYYY')
    }
}



export default function Chatitem(props) {
    return (

        <li className={`${props.index % 2 === 0 ? "message left  appeared" : "message right appeared"}`}>
            <div className="avatar"></div>
            <div className="text_wrapper">
                <div className="text" >{props.name}</div>
                <div></div>
                <ReactMarkdown className="mb-0 text-dark" source={props.message} />
            </div>
            {!props.sent && <p style={{ color: 'red', 'font-size': '8pt' }}>network failed</p>}
            {!props.sent && <i className="fas fa-redo" onClick={props.resend}></i>}
            {props.sent && <i className="fas fa-trash-alt" onClick={props.hapus}></i>}
            <time className="text-dark ml-3 msg-time"> {dateConvert(props.message.time)}. {props.time}</time>
        </li>


    )
}
