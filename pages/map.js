
import Container from "react-bootstrap/Container";
import fetch from "isomorphic-fetch";
import Map from "../components/MapView";

function MapV(props) {
  return (
    <Container>
      <Map visited={props.visited} />
    </Container>
  );
}

MapV.getInitialProps = async ({ req }) => {
  const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
  const res = await fetch(`${baseURL}/api/visited`);
  return {
    visited: await res.json()
  };
};

export default MapV;