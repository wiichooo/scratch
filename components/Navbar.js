import Link from "next/link";
import {Nav, Navbar, Button} from "react-bootstrap";

export default function AppNavbar({ user }) {
  return (
    <Navbar sticky="top" variant="light" expand="lg" className='whiteBackground'>
      
        <Navbar.Brand className='logo'>
          <Link href="/" >
            <a >Travel Share!</a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav navbar-toggler-icon" className=''/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="left-align">
            {user && (
              <>

                <Link href="/about">
                  <a className="nav-link black">About</a>
                </Link>

                <Link href="/share-thought">
                  <a className="nav-link black">Share Must Do!</a>
                </Link>

                <Link href="/mustdos">
                  <a className="nav-link black">Must Do's</a>
                </Link>

                <Link href="/map">
                  <a className="nav-link black">Map</a>
                </Link>

                <Link href="/profile">
                  <a className="nav-link black">Profile</a>
                </Link>
                {/* <Link href="/logout">
                  <a className="nav-link black">Log Out</a>
                </Link> */}
                <Button className="nav-link" variant="danger" href="/logout">
                  Log Out
                </Button>
              </>
            )}
            {!user && (
              <>  
            <Link href="/about">
               <a className="nav-link black">About</a>
            </Link>

            {/* <Link href="/map">
               <a className="nav-link black">Map</a>
            </Link> */}

            <Link href="/mustdos">
               <a className="nav-link black">Must Do's</a>
            </Link>

            <Button className="nav-link" variant="primary" href="/login">
              Log In
            </Button>

              </>
            )}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}