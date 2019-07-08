//reference from ireactstrap form
import React from 'react';
import {NavLink} from 'react-router-dom'
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';

import AuthContext from '../auth-context'
import TimeTool from '../../util/time-generator'
import '../css/request-form.css'


/* 
    This component is for rendering a form 
    that user can submit a walk ruquest
*/
export default class RequestForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            date: TimeTool.getDate(),
            time: TimeTool.getCurrentTime(),
            text: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    static contextType = AuthContext;

    /* udpate the value in state when user chagne the input value */
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    /* When user submit the form, send the request information to endpoint  */
    handleSubmit(event) {
        event.preventDefault();

        const postData = {
            plan_walk_at: this.state.date + ' ' + this.state.time,
        }
        fetch(`/api/routes/${this.context.user_id}`, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then( res => {
            return res.json();
          })
        .then( res => {
            /* redirect to home page after user submit the request */
            this.props.history.push('/home');
        });

    }


    render() {

    /* Deconstructing this component and state 
       This makes JSX neat and clean
    */
        const { handleSubmit, handleInputChange} = this;
        const {date, time, text} = this.state;
        return (
        <React.Fragment>
        <Form className="form col-10 offset-1" onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="exampleDate">Walk Date</Label>
                <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                    onChange={handleInputChange} 
                    value={date}
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleTime">Walk Time</Label>
                <Input
                    type="time"
                    name="time"
                    id="exampleTime"
                    placeholder="time placeholder"
                    onChange={handleInputChange} 
                    value={time}
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">A Note</Label>
                <Input type="textarea" 
                    name="text" 
                    id="exampleText" 
                    onChange={handleInputChange}
                    value={text}
                    placeholder="Leave a message here for your walker...."
                />
            </FormGroup>

            <Button outline className='btn-white' type="submit" value="Submit" >Submit</Button>
            {'  '}
            <NavLink to='/home'>
                <Button  className='btn-white'>Back</Button>
            </NavLink>

        </Form>
        </React.Fragment>
        );
  }
}