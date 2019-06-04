//reference from ireactstrap form
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default class RequestForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            date: "2019-06-07",
            time: "14:33",
            text: "Don't walk with big dogs",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('The form value is' ,this.state);
        event.preventDefault();
    }


    render() {
        const {date, time, text} = this.state;
        return (
        <Form className="col-10 offset-1" onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label for="exampleDate">Walk Date</Label>
                <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                    onChange={this.handleInputChange} 
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
                    onChange={this.handleInputChange} 
                    value={time}
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">A Note</Label>
                <Input type="textarea" name="text" id="exampleText" onChange={this.handleInputChange} value={text}
                    />
            </FormGroup>

            <input type="submit" value="Submit" />

        </Form>
        );
  }
}