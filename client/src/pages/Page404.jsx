import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const Error = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="row">
      <div className="offset-3 col-6">
        {state ? (
          <div className=" alert alert-danger container mt-5">
            <h2 className="alert-heading">
              {state.status} {state.message}
            </h2>
          </div>
        ) : (
          <div className="alert alert-danger container mt-5" role="alert">
            <h2 className="alert-heading">404 Not Found</h2>
          </div>
        )}
        <Link to="/">トップに戻る</Link>
      </div>
    </div>
  );
};

export default Error;
