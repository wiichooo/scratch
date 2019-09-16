import React, { Component } from 'react';
import { Container } from 'next/app';
import {Button, Form, Col, Card, ListGroup} from 'react-bootstrap';
import fetch from "isomorphic-fetch";

class CountryInfo extends Component {
    state = {
        id: this.props.id,
        name: this.props.name,
        data: ''
    };
    static getDerivedStateFromProps(props, state) {
        return state = {
            id: props.id,
            name: props.name,
            data: props.data
         } 
    }
    componentDidMount() {
        fetch(`https://restcountries.eu/rest/v2/alpha/${this.state.id}`)
        .then(res => res.json())
        .then((data) => {
            this.setState({ data: data })
        })
        .catch(console.log)
      }

    render(){
         console.log('datainfo')
         console.log(this.state)
        return(
            
        <Container>
            {this.state.data.languages?
            <Col>
            <Card bg="info" text="white">
            <Card.Img variant="top" src={this.state.data.flag} style={{height: '215px'}} />
            <Card.Body>
                <Card.Title>{this.state.name}</Card.Title>
                <Card.Subtitle className="mb-2" style={{color:'#375a7f'}}>{this.state.id}</Card.Subtitle>
                <Card.Text>
                 Capital: {this.state.data.capital}
                 <br></br>
                 Region:  {this.state.data.region} / {this.state.data.subregion}
                </Card.Text>
                <Card.Header>Info</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Currency: {this.state.data.currencies[0].name + " (" + this.state.data.currencies[0].code +")"} </ListGroup.Item>
                    <ListGroup.Item>Language: {this.state.data.languages[0].name + " (" + this.state.data.languages[0].iso639_1 +")"   }</ListGroup.Item>
                    <ListGroup.Item>Calling Codes: {this.state.data.callingCodes.join()}</ListGroup.Item>
                </ListGroup>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
            </Card>
            </Col>
            :''
            }
        </Container>
        );
    }
}

export default CountryInfo;