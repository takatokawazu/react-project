import React, { useEffect, useState, useContext } from 'react';
import api from '../apiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../state/AuthContext';
import Carousel from 'react-bootstrap/Carousel';

import '../styles/stars.css';

const Camp = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const { id } = useParams();
  const [campground, setCampground] = useState([]);
  const [formData, setFormData] = useState({ rating: 1 });
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    fetchCampgrounds();
  }, []);

  const handleReview = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      formData.author = user.username;
      await api.post(`/reviews/${id}`, formData);
      console.log(formData);
      window.location.href = `/campgrounds/${id}`;
      toast.success('コメント成功しました');
    } catch (e) {
      const { response } = e;
      console.log(e);
      toast.error('コメント失敗しました');
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData);
  };

  const fetchCampgrounds = async () => {
    try {
      const response = await api.get(`/campgrounds/${id}`);
      setCampground(response.data);
      console.log(response.data);
    } catch (e) {
      const { response } = e;
      const err = response.data[0].msg;
      navigate('/campgrounds/error', {
        state: { message: err, status: response.status },
      });
    }
  };

  const handleDelete = async () => {
    try {
      api.delete(`/campgrounds/${id}`);
      navigate('/campgrounds');
      toast.success('投稿を削除しました');
    } catch (e) {
      console.log(e);
      setError(e);
      toast.error('投稿の削除、失敗しました');
    }
  };

  const handleDeleteReview = async (event, reviewId) => {
    event.preventDefault();
    try {
      if (user) {
        api.delete(`/reviews/${id}/${reviewId}`, { data: user });
        setFormData({ rating: 1 });
        fetchCampgrounds();
        toast.success('コメントを削除しました');
      } else {
        navigate('/login');
        toast.success('権限がありません');
      }
    } catch (e) {
      console.log(e);
      toast.success('コメントの削除、失敗しました');
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-6">
        <Card className="mb-3">
          <Carousel>
            {campground.image &&
              campground.image.map((img) => (
                <Carousel.Item key={img.filename}>
                  <div>
                    <Card.Img
                      variant="top"
                      src={`${img.path}`}
                      className="d-block w-100"
                    />
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>
          <Card.Body>
            <Card.Title>{campground.title}</Card.Title>
            <Card.Text>{campground.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="text-muted">
              {campground.location}
            </ListGroup.Item>
            {campground.author && (
              <ListGroup.Item>
                登録者: {campground.author.username}
              </ListGroup.Item>
            )}
            <ListGroup.Item>¥{campground.price}/泊</ListGroup.Item>
          </ListGroup>
          {user &&
            campground.author &&
            campground.author.email == user.email && (
              <Card.Body>
                <Card.Link
                  className="btn btn-info"
                  href={`/campgrounds/${campground._id}/edit`}
                >
                  編集
                </Card.Link>
                <form className="d-inline ml-5" onSubmit={handleDelete}>
                  <button className="btn btn-danger">削除する</button>
                </form>
              </Card.Body>
            )}
          <div className="card-footer text-muted">2 days ago</div>
        </Card>
      </div>
      <div className="col-6">
        {user && (
          <div>
            <h2>レビュー</h2>
            <Form
              className="mb-3"
              onSubmit={handleReview}
              validated={validated}
              noValidate
            >
              <div>
                <fieldset className="starability-basic">
                  <input
                    type="radio"
                    id="first-rate1"
                    name="rating"
                    value="1"
                    onChange={handleInputChange}
                    checked={formData.rating == '1'} // ratingの値に応じてチェック状態を制御
                  />
                  <label htmlFor="first-rate1" title="1">
                    評価1
                  </label>
                  <input
                    type="radio"
                    id="first-rate2"
                    name="rating"
                    value="2"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="first-rate2" title="2">
                    評価2
                  </label>
                  <input
                    type="radio"
                    id="first-rate3"
                    name="rating"
                    value="3"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="first-rate3" title="3">
                    評価3
                  </label>
                  <input
                    type="radio"
                    id="first-rate4"
                    name="rating"
                    value="4"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="first-rate4" title="4">
                    評価4
                  </label>
                  <input
                    type="radio"
                    id="first-rate5"
                    name="rating"
                    value="5"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="first-rate5" title="5">
                    評価5
                  </label>
                </fieldset>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="body">
                  コメント
                </label>
                <textarea
                  className="form-control"
                  name="body"
                  id="body"
                  cols="30"
                  rows="3"
                  onChange={handleInputChange}
                  value={formData.body || ''}
                  required
                ></textarea>
                <Form.Control.Feedback>OK!</Form.Control.Feedback>
              </div>
              <button className="btn btn-success">投稿する</button>
            </Form>
          </div>
        )}
        {campground.reviews &&
          campground.reviews.map((review) => (
            <Card className="mb-3" key={review._id}>
              <Card.Body>
                {review && (
                  <Card.Title className="mb-2">{review.author}</Card.Title>
                )}
                <p className="starability-result" data-rating={review.rating}>
                  評価: {review.rating}
                </p>
                <Card.Text>コメント: {review.body}</Card.Text>
                {user && review.author && review.author == user.username && (
                  <Form
                    onSubmit={(event) => handleDeleteReview(event, review._id)}
                  >
                    <button className="btn btn-sm btn-danger">削除する</button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Camp;
