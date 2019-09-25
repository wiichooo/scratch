import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Thought from "./Thought";

export default function Thoughts(props) {
  return (
    <Row>
      <Col xs={12} >
        <h2 className='blackText'>Latest Must's</h2>
      </Col>
      {props.thoughts &&
        props.thoughts.map(thought => (
          <Col key={thought._id} xs={12} sm={6} md={4} lg={4}>
            <Thought mustdo={thought} />
          </Col>
        ))}
      {!props.thoughts && <Col xs={12}>Loading...</Col>}
    </Row>
  );
}