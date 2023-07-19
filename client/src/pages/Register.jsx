import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import api from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      const response = await api.post('/auth/register', user);
      navigate(`/campgrounds`);
      toast.success('新規登録が成功しました');
    } catch (e) {
      const { response } = e;
      console.log(response);
      const err = response.data.message;
      navigate('/register');
      toast.error(err);
    }
  };
  return (
    <div className="mt-5 row">
      <h1 className="text-center">ユーザー登録</h1>
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
              type="text"
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
              id="password"
              ref={password}
              required
            />
            <Form.Control.Feedback>OK!</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <button className="btn btn-success" type="submit">
              登録する
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
