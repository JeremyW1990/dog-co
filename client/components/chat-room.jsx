import React from "react";
import {Button, Input} from 'reactstrap'
import openSocket from 'socket.io-client';
import {NavLink} from 'react-router-dom'



import AuthContext from '../auth-context'
import '../css/chat-room.css'

 
class ChatRoom extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            chatHistory: [
                {id:1, sender_id: 1, receiver_id: 2, message: 'Hey, Jeremy here. Just to confirm with you that u r still able to walk my dog tonight?', time: new Date().toLocaleTimeString()},
                {id:2, sender_id: 2, reciever_id: 1, message: 'hey, Whatup,Jeremy. Yeah, stick with the schedule. I will be there at 7pm.', time: new Date().toLocaleTimeString()},
                {id:3, sender_id: 1, reciever_id: 2, message: 'Awesome!', time: new Date().toLocaleTimeString()},
                {id:4, sender_id: 2, reciever_id: 1, message: 'I will meet you at front door, cool with that?', time: new Date().toLocaleTimeString()},
                {id:5, sender_id: 1, reciever_id: 2, message: 'Sure, 7pm, see you front door.', time: new Date().toLocaleTimeString()},
                {id:6, sender_id: 2, reciever_id: 1, message: 'Okie dokie!', time: new Date().toLocaleTimeString()},
                
            ],
            message: '',
        }
        this.socket = null;
        this.sendMessage = this.sendMessage.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    static contextType = AuthContext;

    sendMessage(){
        console.log('emtting new-message')
        this.socket.emit('new-message', 
        {
            message: this.state.message,
            sender_id:this.context.user_id,
            receiver_id: this.context.current_walk_paired_user_id,
            time: new Date().toLocaleTimeString(),
        });
        this.setState({message:''})

    }

    changeHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount(){
        this.socket = openSocket('http://localhost:3001');
        this.socket.on('new-message', data => {
            console.log("Socket Client received : new-message", data);
            const chatHistory = this.state.chatHistory.concat({...data})
            this.setState({ chatHistory },()=>console.log(this.state))
        });
    }

    render() {

        const {message, chatHistory } = this.state;
        const {changeHandler, sendMessage} = this;


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
        })).reverse();
        //flex column reverse

        return (

            <div className="chat-room" >
                <NavLink to='/home' className="d-block m-2 back-button">
                    <Button className='btn-white'>Back</Button>
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