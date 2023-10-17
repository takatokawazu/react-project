import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../state/AuthContext';

const Navi = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // ログアウト処理
    toast.success('ログアウト成功しました');
    navigate('/login'); // ログアウト後にログインページに遷移
  };
  return (
    <Navbar sticky="top" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">CampApp</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">ホーム</Nav.Link>
          <Nav.Link href="/campgrounds">キャンプ場</Nav.Link>
          <Nav.Link href="/campgrounds/new">新規登録</Nav.Link>
        </Nav>
        <Nav>
          {user ? (
            <button className="nav-link" onClick={handleLogout}>
              ログアウト
            </button>
          ) : (
            <Link to="/login" className="nav-link text-decoration-none">
              ログイン
            </Link>
          )}
          <Link to="/register" className="nav-link text-decoration-none">
            ユーザー登録
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navi;
