import React, { useState, useEffect } from "react";
import Loading from './Loading';
import axios from "axios";
import Comment from './Comment';

export default function PostDetail({ match }) {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    const postUrl = `https://jsonplaceholder.typicode.com/posts/${match.params.id}`
    const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${match.params.id}/comments`;
    axios.get(postUrl)
    .then(response => {
        setPost(response.data);
    })
    .catch(error => {
        console.log(error);
    })
    axios
      .get(commentsUrl)
      .then((response) => {
        setComments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    loading? <Loading />
    :
    <>
    {/* Post Image */}
      <div className="row my-3 justify-content-center">
        <div className="col-md-8">
          <img
            src="http://placehold.it/750x300"
            alt=""
            className="img-fluid"
            style={{ objectFit: "cover", width: "100%", maxHeight: "300px" }}
          />
        </div>
      </div>
      
    {/* Post Description */}
      <div className="row mt-2 justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>{post.title}</h5>
            </div>
            <div className="card-body">
              <p className="card-title text-left font-weight-bold">Post Body</p>
              <p className="card-text text-justify">{post.body}</p>
            </div>
          </div>
        </div>
      </div>
    {/* Post Comments */}
      <Comment comments={comments} />
    </>
  );
}
