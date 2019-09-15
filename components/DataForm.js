import React, { Component } from 'react';
import { Container } from 'next/app';
import {Button, Form, Col, Row, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import DatePicker from "react-datepicker";

class DataForm extends Component {
    state = {
        id: this.props.id,
        name: this.props.name,
        vistited: false,
        wishlist: false,
        comment: '',
        startDate: new Date(),
        fill: '{"_value":{"r":240,"g":92,"b":92}}',
        color: 'Select a color'
    };
    construtor(props) {
        console.log(this.state)
        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRadio = this.handleRadio.bind(this)
        this.handleComment = this.handleComment.bind(this)
    }
    static getDerivedStateFromProps(props, state) {
        return state = {
            id: props.id,
            name: props.name
        } //, vistited:false, wishlist:false,comment:'',startDate: new Date()};
    }
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleRadio(label) {
        console.log(label)
        if (label == 'visited') {
            this.setState({
                vistited: true,
                wishlist: false
            })
        } else {
            this.setState({
                vistited: false,
                wishlist: true
            })
        }
    }


    handleColor(color) {
        let cfill;
        if (color == 'Blue')
            cfill = "rgb(0,51,102)"
        else if (color == 'Green')
            cfill = "rgb(0,102,0)"
        else if (color == 'Red')
            cfill = "rgb(153,0,0)"

        this.setState({
            color: color,
            fill: cfill
        })
    }

    submit() {
        this.props.onChange(this.props.id, this.props.name, this.state.vistited,
            this.state.wishlist, this.state.comment, this.state.startDate, this.state.fill);
    }
    render(){
         console.log('render')
        return(
            
        <Container>
            <Col className='formcol'>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="6">
                    Country
                    </Form.Label>
                    <Col sm="5">
                    <Form.Control plaintext readOnly value={this.state.name +' ('+ this.state.id+')'} />
                    </Col>
                </Form.Group>
                <fieldset>
                    <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={6} >
                        Already visited or for your wishlist?
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Check
                        type="radio"
                        label="Visited"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        checked={this.state.vistited}
                        onChange={() => this.handleRadio('visited')}
                        />
                        <Form.Check
                        type="radio"
                        label="Wishlist"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        checked={this.state.wishlist}
                        onChange={() => this.handleRadio('wishlist')}
                        />
                    </Col>
                    </Form.Group>
                </fieldset>
                {this.state ?
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="6">
                    Visited Date:
                    </Form.Label>
                    <Col sm="5">
                     <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                    />
                    </Col>
                </Form.Group>
                :null}
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="6">
                    Color:
                    </Form.Label>
                    <Col sm="5">
                        <DropdownButton id="dropdown-basic-button" title={this.state.color}>
                        <Dropdown.Item onClick={() => this.handleColor('Green')}>Green</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handleColor('Blue')}>Blue</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handleColor('Red')}>Red</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows="3" value={this.state.comment}   onChange={(event)=>{
                      this.setState({
                        comment:event.target.value
                      });
                   }}/>
                </Form.Group>
                <Button className='saveButton' variant="primary"  onClick={() => this.submit()}>
                Save!
                </Button>
            </Col>
        </Container>
        );
    }
}

export default DataForm;