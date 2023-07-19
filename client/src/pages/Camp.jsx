import React, { useEffect, useState } from 'react';
import api from '../apiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-hot-toast';

const Camp = () => {
  const navigate = useNavigate();
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
      await api.post(`/reviews/${id}`, formData);
      window.location.href = `/campgrounds/${id}`;
      toast.success('コメント成功しました');
    } catch (e) {
      const { response } = e;
      console.log(response);
      toast.success('コメント失敗しました');
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const fetchCampgrounds = async () => {
    try {
      const response = await api.get(`/campgrounds/${id}`);
      setCampground(response.data);
    } catch (e) {
      const { response } = e;
      // const err = response.data[0].msg;
      // navigate('/campgrounds/error', {
      //   state: { message: err, status: response.status },
      // });
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
      api.delete(`/reviews/${id}/${reviewId}`);
      setFormData({ rating: 1, body: '' });
      fetchCampgrounds();
      toast.success('コメントを削除しました');
    } catch (e) {
      console.log(e);
      toast.success('コメントの削除、失敗しました');
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-6">
        <Card className="mb-3">
          <Card.Img variant="top" src={`${campground.image}`} />
          <Card.Body>
            <Card.Title>{campground.title}</Card.Title>
            <Card.Text>{campground.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="text-muted">
              {campground.location}
            </ListGroup.Item>
            <ListGroup.Item>¥{campground.price}/泊</ListGroup.Item>
          </ListGroup>
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
          <div className="card-footer text-muted">2 days ago</div>
        </Card>
      </div>
      <div className="col-6">
        <h2>レビュー</h2>
        <Form
          className="mb-3"
          onSubmit={handleReview}
          validated={validated}
          noValidate
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="rating">
              評価
            </label>
            <input
              className="form-range"
              type="range"
              min="1"
              max="5"
              name="rating"
              id="rating"
              value={formData.rating}
              onChange={handleInputChange}
            />
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
        {campground.reviews &&
          campground.reviews.map((review) => (
            <Card className="mb-3" key={review._id}>
              <Card.Body>
                <Card.Title>評価: {review.rating}</Card.Title>
                <Card.Text>コメント: {review.body}</Card.Text>
                <Form
                  onSubmit={(event) => handleDeleteReview(event, review._id)}
                >
                  <button className="btn btn-sm btn-danger">削除する</button>
                </Form>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Camp;
