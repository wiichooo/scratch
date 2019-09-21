import React, { Component } from 'react';
import { Container } from 'next/app';
import {Button, Form, Col, Row, InputGroup, FormControl, DropdownButton, Dropdown,Card} from 'react-bootstrap';
import DatePicker from "react-datepicker";

class DataForm extends Component {
    state = {
        id: this.props.id,
        name: this.props.name,
        visited: false,
        wishlist: false,
        comment: '',
        startDate: new Date(),
        fill: '{"_value":{"r":240,"g":92,"b":92}}',
        color: 'Select a color',
        selected: null,
        colors: [
                {color:'Red',code:'rgb(208,2,27)'},
                {color:'Blue',code:'rgb(74,144,226)'},
                {color:'Green',code:'rgb(126,211,33)'},
                {color:'Orange',code:'rgb(245,166,35)'},
                {color:'Yellow',code:'rgb(204,191,32)'},
                {color:'Purple',code:'rgb(144,19,254)'}
                ]
    };
    construtor(props) {
        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRadio = this.handleRadio.bind(this)
        this.handleComment = this.handleComment.bind(this)
        this.getColor = this.getColor.bind(this)
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props.selected)
        return state = {
            id: props.id,
            name: props.name,
            visited: props.selected != undefined?props.selected.visited: props.id==state.id?state.visited: false,
            wishlist: props.selected != undefined?props.selected.wishlist: props.id==state.id?state.wishlist: false,
            comment: props.selected != undefined?props.selected.comment: props.id==state.id?state.comment: '',
            color: props.selected != undefined ? state.colors.find(function(color){return color.code == props.selected.fill}).color : props.id==state.id ? state.color : 'Select a color',
            startDate: props.selected != undefined ? new Date(props.selected.date)  : props.id==state.id ? state.startDate: new Date()
        }
    }
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleRadio(label) {
        //console.log(label)
        if (label == 'visited') {
            this.setState({
                visited: true,
                wishlist: false
            })
        } else {
            this.setState({
                visited: false,
                wishlist: true
            })
        }
    }


    handleColor(scolor) {
        console.log(this.state.colors)
        console.log(this.state.colors.find(function(color){return color.color == scolor}).code)
        this.setState({
            color: scolor,
            fill: this.state.colors.find(function(color){return color.color == scolor}).code
        })
    }

    submit() {
        this.props.onChange(this.props.id, this.props.name, this.state.visited,
            this.state.wishlist, this.state.comment, this.state.startDate, this.state.fill);
    }

    render(){
        console.log('render DF')
        return(
            
        <Container>
            <Col>
            <Card border="primary" className='card-color'>
                <Card.Header>Selected</Card.Header>
                <Card.Body>
                <Card.Title>Your info</Card.Title>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="6">
                        Country:
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
                            checked={this.state.visited}
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
                        <DatePicker className='datepicker'
                            dateFormat="dd-MM-yyyy"
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
                            <Dropdown.Item onClick={() => this.handleColor('Orange')}>Orange</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleColor('Yellow')}>Yellow</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleColor('Purple')}>Purple</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control as="textarea" rows="5" value={this.state.comment}   onChange={(event)=>{
                        this.setState({
                            comment:event.target.value
                        });
                    }}/>
                    </Form.Group>
                    <Button className='saveButton' variant="primary"  onClick={() => this.submit()} style={{width:'100%'}}>
                    Save!
                    </Button>
                </Card.Body>
            </Card>
                
            </Col>
        </Container>
        );
    }
}

export default DataForm;