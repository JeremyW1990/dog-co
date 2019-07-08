import React from "react";
import {Button, Input} from 'reactstrap'
import openSocket from 'socket.io-client';
import {NavLink} from 'react-router-dom'

import AuthContext from '../auth-context'
import '../css/chat-room.css'

 
/* 
    A simple chatroom, allowing two users communicate
*/
class ChatRoom extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            chatHistory: [

                /* Hardcoded chat content for demo purpose. 
                   Will be removed when fully chatroom features implemented
                */
                {id:1, sender_id: 1, receiver_id: 2, message: 'Hey, Jeremy here. Just to confirm with you that u r still able to walk my dog tonight?', time: new Date().toLocaleTimeString()},
                {id:2, sender_id: 2, reciever_id: 1, message: 'hey, Whatup,Jeremy. Yeah, stick with the schedule. I will be there at 7pm.', time: new Date().toLocaleTimeString()},
                {id:3, sender_id: 1, reciever_id: 2, message: 'Awesome!', time: new Date().toLocaleTimeString()},
                {id:4, sender_id: 2, reciever_id: 1, message: 'I will meet you at front door, cool with that?', time: new Date().toLocaleTimeString()},
                {id:5, sender_id: 1, reciever_id: 2, message: 'Sure, 7pm, see you front door.', time: new Date().toLocaleTimeString()},
                {id:6, sender_id: 2, reciever_id: 1, message: 'Okie dokie!', time: new Date().toLocaleTimeString()},
                
            ],

            /* input field value */
            message: '',
        }
        this.socket = null;
        this.sendMessage = this.sendMessage.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    /* get the context here  */
    static contextType = AuthContext;

    /* 
        When user send a message, emit the message through sockiet.IO
        the emitting load include the text, send_id, receiver_id, and timestamp information
        and reset the message input field to empty
    */
    sendMessage(){
        this.socket.emit('new-message', 
        {
            message: this.state.message,
            sender_id:this.context.user_id,
            receiver_id: this.context.current_walk_paired_user_id,
            time: new Date().toLocaleTimeString(),
        });
        this.setState({message:''})
    }

    /* 
        Input change filed handler
        update the text content to state
    */
    changeHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }

    /* 
        When chatroom component is mounted, we connent the socket.IO channel here
        Set up a 'new-message' customized event listener here. 
        When the event is trigger, it means a new mesage is received, we update to content to state and display it
        We don't have an endpoint to call here, so the message will not be saved in database
        This feature will be implemented in the future.
    */
    componentDidMount(){
        this.socket = openSocket(process.env.NODE_ENV ==='development' ? 'http://localhost:3001' : undefined);

        this.socket.on('new-message', data => {
            const chatHistory = this.state.chatHistory.concat({...data})
            this.setState({ chatHistory });
        });
    }

    componentWillUnmount() {
        /* 
            When user leave the chatroom, we disconnect the socket.IO connnection
            to prevent memory leak 
        */
        this.socket.close();
    }

    render() {

        /* Deconstructing this component and state 
           This makes JSX neat and clean
        */

        const {message, chatHistory } = this.state;
        const {changeHandler, sendMessage} = this;

        /* 
            User map to generate jsx from raw text
            Because text will be displayed at different places on screen depending on weather user sends it or receiveds it
            We decide which case and attach different css to it
        */
        const chatHistoryList = chatHistory.map((chat =>{
            if (this.context.user_id === chat.sender_id) {
                return (
                    <div key={chat.id} className="text-area my-text">
                        <div className='speech-bubble'>{chat.message}</div>
                        <div className="time">{chat.time}</div>
                    </div>
                )

            }
            return (
                <div key={chat.id} className="text-area incoming-text">
                    <span className="font-weight-light font-italic">{this.context.user_id === 1 ? "Howard": "Jeremy"}</span>
                    <div className='speech-bubble'>{chat.message}</div>
                    <div className="time">{chat.time}</div>
                </div>
            )
        
        /* 
            text is saved in state in chronological order,
            we reverse here, and set the css to flex-column-reverse to reverse it back again
            So the latest text will still be at the bottom,
            and bottom text will be always dispalyed
            old text will be overflowed.
        */
        })).reverse();

        return (

            <div className="chat-room" >
                <NavLink to='/home' className="d-block m-2 back-button">
                    <Button className='btn-white d-block'>Back</Button>
                </NavLink>
                <div className="chat-history d-flex flex-column-reverse">
                    {chatHistoryList}
                </div>
                <div className="controls">
                    <Input className='input' value={message} onChange={changeHandler} name='message'/>
                    <Button outline className='btn-white send-button'
                        onClick={sendMessage}
                    >Send</Button>
                </div>
            </div>
        );
    }
}
 
export default ChatRoom;