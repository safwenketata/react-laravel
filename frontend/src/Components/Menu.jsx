import { Nav, Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>E-Book</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/Specialite">Specialite</Nav.Link>
          <Nav.Link as={Link} to="/Editeur">Editeur</Nav.Link>
          <Nav.Link as={Link} to="/Auteur">Auteur</Nav.Link>
          <Nav.Link as={Link} to="/livres">Livre</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
          <Button variant="success">Chercher</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Menu;
