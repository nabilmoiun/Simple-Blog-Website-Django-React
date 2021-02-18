import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ post, endpoint }) => {
  let { id, title, body, first_name, email, date } = post;
  if (!date) {
    date = "4, 2017";
    first_name = "Star Strbootstrap";
  } else {
    let day = new Date(date).getDate();
    let month = new Date(date).getMonth();
    let year = new Date(date).getFullYear();
    date = `${day}-${month}-${year}`;
  }
  return (
    <div className="col-md-12 mb-2">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                className="img-fluid rounded"
                src="http://placehold.it/750x300"
                alt=""
              />
            </div>
            <div className="col-md-6 text-left">
              <h3 className="mr-auto">{title.slice(0, 10)}</h3>
              <p className="lead card-text text-justify mr-auto">
                {body.length < 100 ? body : body.slice(0, 100)}
              </p>
              <Link
                className="btn btn-primary text-decoration-none mr-auto"
                to={`${endpoint}${id}`}
                role="button"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <p className="lead">
            Posted on {date} by {first_name?first_name:email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Posts;
