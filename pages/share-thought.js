
import Router from "next/router";
import {Form, Button, Card, Container} from "react-bootstrap";
const { useState } = require("react");

export default function ShareThought() {
  const [  message, setMessage] = useState("");
  const [  country, setCountry] = useState("");
  async function submit(event) {
    event.preventDefault();
    await fetch("/api/thoughts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        country
      })
    });
    Router.push("/mustdos");
  }

  return (
    <Container>
    <Card className='whiteText card-color'>
      <Card.Header>Got something to share?</Card.Header>
      <Card.Body>
      <Form onSubmit={submit}>
      <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            onChange={e => setCountry(e.target.value)}
            value={country}
          />
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
    </Container>
  );
}