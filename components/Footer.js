
import {Container, Jumbotron, Button, Row, Col} from "react-bootstrap";
import fetch from "isomorphic-fetch";
import Thoughts from "./Thoughts";

function Footer(props) {
  return (
      <>
      <Row className="font-small pt-4 mt-4 blueBackground">
          <Col md="2"></Col>
          <Col md="4">
            <h5 className="title">Travel Musts</h5>
            <p>
              Hobbie app in which you can track your conuntries
              visited or for wishlist, and share public musts do's.
            </p>
          </Col>
          <Col md="4">
            <h5 className="title">Links</h5>
            <ul style={{display:'flex'}}>
              <Col md="6">  
              <li className="list-unstyled">
                <a href="/">Home</a>
              </li>
              <li className="list-unstyled">
                <a href="/login">Login</a>
              </li>
              
              </Col>
              <Col md="6"> 
              <li className="list-unstyled">
                <a href="/mustdos">Must Dos</a>
              </li>
              <li className="list-unstyled">
                <a href="/about">About</a>
              </li>
              </Col>
            </ul>
          </Col>
          <Col md="2"></Col>

      </Row>
             <Row className="footer-copyright text-center py-3 bluefBackground">
             <Container fluid>
               &copy; {new Date().getFullYear()} Guatemala
             </Container>
           </Row>
           </>
  );
}

// Index.getInitialProps = async ({ req }) => {
//   const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
//   const res = await fetch(`${baseURL}/api/thoughts`);
//   return {
//     thoughts: await res.json()
//   };
// };

export default Footer;
