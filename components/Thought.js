import Card from "react-bootstrap/Card"

export default function Thought({ thought }) {
  const cardStyle = { marginTop: "15px" };
  return (
    <Card border="info" text="white" style={cardStyle}>
      <Card.Header>Featured {thought.country}</Card.Header>
      <Card.Body>
        <Card.Title>{thought.message}</Card.Title>
        <Card.Text style={{textAlign: 'right'}}>by {thought.author}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted" style={{textAlign: 'center'}}>2 days ago</Card.Footer>
    </Card>
  );
}