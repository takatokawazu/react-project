import React, { useState, useContext, useEffect } from 'react';
import api from '../apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../state/AuthContext';

const NewCamp = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user.email;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/auth?email=${userEmail}`);
      setUserId(response.data._id);
    } catch (error) {
      console.log(error);
      // navigate('/campgrounds/error', {
      //   state: { message: "エラーが発生しました", status: response.status },
      // });
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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
      formData.author = userId;
      const response = await api.post('/campgrounds', formData);
      navigate(`/campgrounds/${response.data._id}`);
      toast.success('新規登録が成功しました');
    } catch (e) {
      // const { response } = e;
      // const err = response.data[0].msg;
      // navigate('/campgrounds/error', {
      //   state: { message: err, status: response.status },
      // });
      console.log(e);
      toast.error('新規登録が失敗しました');
    }
  };

  return (
    <div className="mt-5 row">
      <h1 className="text-center">キャンプ場の新規登録</h1>
      <div className="offset-3 col-6">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              タイトル
            </label>
            <input
              className="form-control"
              type="text"
              name="title"
              id="title"
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback>OK!</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="location">
              場所
            </label>
            <input
              className="form-control"
              type="text"
              name="location"
              id="location"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback>OK!</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="image">
              画像URL
            </label>
            <input
              className="form-control"
              type="text"
              name="image"
              id="image"
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback>OK!</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="price">
              価格
            </label>
            <InputGroup>
              <InputGroup.Text id="price-label">¥</InputGroup.Text>
              <Form.Control
                id="price"
                placeholder="0"
                aria-label="価格"
                aria-describedby="price-label"
                onChange={handleInputChange}
                name="price"
                required
              />
              <Form.Control.Feedback>OK!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                数字を入力してください
              </Form.Control.Feedback>
            </InputGroup>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="description">
              説明
            </label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              id="description"
              onChange={handleInputChange}
              required
            ></textarea>
            <Form.Control.Feedback>OK!</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <button className="btn btn-success" type="submit">
              登録する
            </button>
          </div>
        </Form>
        <div className="alert-danger text-center">{error}</div>
        <Link to="/campgrounds">戻る</Link>
      </div>
    </div>
  );
};

export default NewCamp;
