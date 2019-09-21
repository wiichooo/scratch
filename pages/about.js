import {Container, Jumbotron} from "react-bootstrap";
import Thoughts from "../components/Thoughts";

function About(props) {
  return (
    <Container>
        
        <Jumbotron className='whiteText card-color'>
        <h2>
            Hello,
        </h2>
        <p>This are some tech used for this project:</p>
        <ul>
            <li><b>Conuntry information: </b>https://restcountries.eu/#api-endpoints-all</li>
            <li><b>Auth0: </b>for authentication.</li>
            <li><b>AmMaps: </b>for maps.</li>
        </ul>
        </Jumbotron>
    </Container>
  );
}

export default About;
