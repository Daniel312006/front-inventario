// Navbar bootstrap component
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
//import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">IE EL ROSARIO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/inventarios">Inventario</Nav.Link>
            <Nav.Link href="/Estados">Estados</Nav.Link>
            <Nav.Link href="/Marcas">Marcas</Nav.Link>
            <Nav.Link href="/Tipos">Tipos</Nav.Link>
            <Nav.Link href="/Usuarios">Usuarios</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar