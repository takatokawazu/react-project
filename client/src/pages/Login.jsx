import React, { useState, useContext, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loginCall } from '../actionCalls';
import { AuthContext } from '../state/AuthContext';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const location = useLocation();
  const { state } = location;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    const currentUser = await loginCall(loginData, dispatch);
    if (currentUser) {
      if (state) {
        navigate(state);
      } else {
        navigate('/campgrounds');
      }
      toast.success('ログイン成功しました。');
    } else {
      toast.error('ログイン失敗しました。');
      navigate('/login');
    }
  };

  return (
    <div className="mt-5 row">
      <h1 className="text-center">ログイン</h1>
      <div className="offset-3 col-6">
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="username">
              ユーザー名
            </label>
            <input
              className="form-control"
              type="username"
              id="username"
              ref={username}
              required
            />
            <Form.Control.Feedback>OK!</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              メールアドレス
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              ref={email}
              required
            />
            <Form.Control.Feedback>OK!</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              パスワード
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              ref={password}
              required
            />
            <Form.Control.Feedback>OK!</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <button className="btn btn-success">ログイン</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
