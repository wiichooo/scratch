
import Router from "next/router";
import {Form, Button, Card, Container, Col} from "react-bootstrap";
const { useState } = require("react");
import countriesData from "../static/countries.json";
export default function ShareThought() {
  const [  message, setMessage] = useState("");
  const [  country, setCountry] = useState("");
  //let country;
  let name;
  let flag;
  const countries =  countriesData;

  // async function setCountry(e) {
  //   country = e;
  //   console.log(country)
  //     const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${country}`);
  //     //return {
  //      let info = await res.json();
  //      name = info.name;
  //      flag = info.flag;
  //     //}
  // }

  async function submit(event) {
    event.preventDefault();
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${country}`);
      //return {
    let info = await res.json();
    let name = info.name;
    let flag = info.flag;
    await fetch("/api/thoughts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        country,
        name,
        flag
      })
    });
    Router.push("/mustdos");
  }

  return (
    <Container>
    <Col xs={12} sm={12} md={12} lg={{ span: 10, offset: 1 }}>
    <Card className='whiteText card-color' >
      <Card.Header>Got something to share?</Card.Header>
      <Card.Body>
      <Form onSubmit={submit}>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select Country:</Form.Label>
          <Form.Control as="select"
              value= {country}
              onChange={e => setCountry(e.target.value)}>
              <option>Choose...</option>
              { Object.keys(countries).map(code => (
              <option 
              key={code}
              value={countries[code].Code}>
              {countries[code].Name} ({countries[code].Code})
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>What is in your mind?</Form.Label>
          <Form.Control
            as="textarea" rows="5"
            type="text"
            placeholder="Share something"
            onChange={e => setMessage(e.target.value)}
            value={message}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Share!
        </Button>
      </Form>
      </Card.Body>
    </Card>
    </Col>
    </Container>
  );
}