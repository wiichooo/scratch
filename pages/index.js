
import {Container, Jumbotron, Button, Row, Col} from "react-bootstrap";
import fetch from "isomorphic-fetch";
import Thoughts from "../components/Thoughts";

function Index(props) {
  return (
    <Container>
      {/* <Thoughts thoughts={props.thoughts} /> */}
      <Jumbotron>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
      <Jumbotron>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
    </Container>
  );
}

// Index.getInitialProps = async ({ req }) => {
//   const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
//   const res = await fetch(`${baseURL}/api/thoughts`);
//   return {
//     thoughts: await res.json()
//   };
// };

export default Index;
