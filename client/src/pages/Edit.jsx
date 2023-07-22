import React, { useState, useEffect, useContext } from 'react';
import api from '../apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-hot-toast';
import Image from 'react-bootstrap/Image';
import { AuthContext } from '../state/AuthContext';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const userEmail = user.email;
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  const [files, setFiles] = useState(null);
  useEffect(() => {
    const getTitle = async () => {
      const res = await api.get(`/campgrounds/${id}`);
      setFormData(res.data);
      setFiles(res.data.image);
      const { email } = res.data.author;
      if (userEmail !== email) {
        navigate('/campgrounds');
        toast.error('編集できません。');
        return;
      }
    };
    getTitle();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // if (type === 'checkbox') {
    //   setFormData((prevFormData) => {
    //     console.log(prevFormData);

    //     return {
    //       ...prevFormData,
    //     };
    //   });
    // } else {
    //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   });
    // }
    if (type === 'checkbox') {
      setFormData((prevFormData) => {
        const updatedImageArray = prevFormData.image.map((img) => {
          // If the checkbox's value matches the image filename, update the checked property.
          if (img.filename === value) {
            return {
              ...img,
              checked: checked,
            };
          }
          return img;
        });

        return {
          ...prevFormData,
          image: updatedImageArray,
        };
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

    let imageUrls = [];
    if (files) {
      const data = new FormData();
      for (let file of files) {
        console.log(file);
        data.append('files', file);
      }
      try {
        // Assume this API endpoint will upload the file and return a URL or ID.
        const response = await api.post('/uploads', data);
        imageUrls = response.data;
        console.log(imageUrls);
      } catch (e) {
        console.log(e);
        toast.error('画像のアップロードに失敗しました');
        return;
      }
    }

    try {
      formData.image = imageUrls;
      const response = await api.put(
        `/campgrounds/${id}?email=${userEmail}`,
        formData
      );
      navigate(`/campgrounds/${id}`);
      toast.success('編集が成功しました');
    } catch (error) {
      console.log(error);
      const { response } = error;
      // const err = response.data;
      // navigate('/campgrounds/error', {
      //   state: { message: err, status: response.status },
      // });
      toast.error('編集が失敗しました');
    }
  };

  console.log(formData);

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
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>画像の追加アップロード</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
          </Form.Group>
          <div className="mb-3">
            {formData.image &&
              formData.image.map((img, i) => (
                <>
                  <Image src={img.path} alt="" thumbnail />
                  <div className="form-check-inline">
                    <input
                      type="checkbox"
                      id={`image${i}`}
                      onChange={handleInputChange}
                      value={img.filename}
                    />
                  </div>
                  <label htmlFor={`image${i}`}>削除する</label>
                </>
              ))}
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
