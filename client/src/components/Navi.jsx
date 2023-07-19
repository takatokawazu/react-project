import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navi = () => {
  return (
    <Navbar sticky="top" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Yelp</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">ホーム</Nav.Link>
          <Nav.Link href="/campgrounds">キャンプ場</Nav.Link>
          <Nav.Link href="/campgrounds/new">新規登録</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navi;
