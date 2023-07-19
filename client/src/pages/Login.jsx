import React, { useState, useContext, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import api from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loginCall } from '../actionCalls';
import { AuthContext } from '../state/AuthContext';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const username = useRef();
  const password = useRef();
  console.log(username.current);
  console.log(password);
  const { user, isFetcing, error, dispatch } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      {
        username: username.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  console.log(user);
  // const navigate = useNavigate();
  // const [formData, setFormData] = useState({});
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     setValidated(true);
  //     return;
  //   }

  //   try {
  //     const { data } = await api.post('/auth/login', formData);
  //     const msg = data.msg;
  //     navigate(`/campgrounds`);
  //     toast.success(msg);
  //   } catch (e) {
  //     setFormData({});
  //     navigate('/login');
  //     toast.error('パスワードまたはユーザー名が間違っています。');
  //   }
  // };
  // const handleInputChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // };
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
