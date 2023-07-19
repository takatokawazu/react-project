import React, { useState, useEffect } from 'react';
import api from '../apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-hot-toast';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const getTitle = async () => {
      const res = await api.get(`/campgrounds/${id}`);
      setFormData(res.data);
    };
    getTitle();
  }, [id]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    try {
      const response = await api.put(`/campgrounds/${id}/edit`, formData);
      navigate(`/campgrounds/${id}`);
      toast.success('編集が成功しました');
    } catch (error) {
      const { response } = error;
      const err = response.data[0].msg;
      navigate('/campgrounds/error', {
        state: { message: err, status: response.status },
      });
      toast.error('編集が失敗しました');
    }
  };
  return (
    <div className="mt-5 row">
      <h1 className="text-center">キャンプ場の編集</h1>
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
              value={formData.title || ''}
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
              value={formData.location || ''}
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
              value={formData.image || ''}
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
                value={formData.price || ''}
                onChange={handleInputChange}
                name="price"
                required
              />
              <Form.Control.Feedback>OK!</Form.Control.Feedback>
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
              value={formData.description || ''}
              onChange={handleInputChange}
              required
            ></textarea>
            <Form.Control.Feedback>OK!</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <button className="btn btn-info" type="submit">
              更新する
            </button>
          </div>
        </Form>
        <Link to="/campgrounds">戻る</Link>
      </div>
    </div>
  );
};

export default Edit;
