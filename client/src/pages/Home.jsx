import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div
      className="align-items-center d-flex h-100 justify-content-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      <div className="w-50 text-center">
        <h2>CampApp</h2>
        <p>
          サンプルで作りました。キャンプ場の場所の登録、レビューをすることができます。
        </p>
        <Link to="/campgrounds">
          <button type="button" class="btn btn-success">
            Go to campground!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
