import React, { Component } from 'react';
import { Container } from 'next/app';
import {Button, Form, Col, Card, ListGroup} from 'react-bootstrap';
import DatePicker from "react-datepicker";

class CountryInfo extends Component {
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

    render(){
         console.log('render')
        return(
            
        <Container>
            <Col>
            <Card bg="info" text="white" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{this.state.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.state.id}</Card.Subtitle>
                <Card.Text>
                 Capital: {this.state.id}
                 Region:
                </Card.Text>
                <Card.Header>Featured</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Currency:</ListGroup.Item>
                    <ListGroup.Item>Language:</ListGroup.Item>
                    <ListGroup.Item>CallingCode:</ListGroup.Item>
                </ListGroup>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
            </Col>
        </Container>
        );
    }
}

export default CountryInfo;