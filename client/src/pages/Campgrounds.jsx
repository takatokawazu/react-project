import React, { useEffect, useState } from 'react';
import api from '../apiConfig';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/stars.css';

const Campgrounds = () => {
  const navigate = useNavigate();
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    fetchCampgrounds();
  }, []);

  const fetchCampgrounds = async () => {
    try {
      const response = await api.get('/campgrounds');
      setCampgrounds(response.data);
    } catch (error) {
      const { response } = error;
      const err = response.data[0].msg;
      navigate('/campgrounds/error', {
        state: { message: err, status: response.status },
      });
    }
  };

  return (
    <div className="mt-5 container">
      <h1>キャンプ場一覧</h1>
      <div>
        <Link to="/campgrounds/new">新規登録</Link>
      </div>
      {campgrounds.map((campground) => (
        <Container className="mb-5" key={campground.id}>
          <Card>
            <Row>
              <Col>
                <Card.Img
                  className="img-fruid"
                  src={`${campground.image}`}
                  style={{ width: '100%' }}
                />
              </Col>

              <Col>
                <Card.Body>
                  <Card.Title>{campground.title}</Card.Title>
                  <Card.Text>{campground.description}</Card.Text>
                  <Card.Text>
                    <small className="text-muted">{campground.location}</small>
                  </Card.Text>
                  <Button variant="primary">
                    <Link
                      to={`/campgrounds/${campground._id}`}
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      {campground.title}の詳細
                    </Link>
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      ))}
    </div>
  );
};

export default Campgrounds;
