import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Comment from './Comment';

export default function UserPostDetails({match, history}) {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
      name: "",
      email: "",
      body: "",
      post: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let localhost = "http://localhost:8000";
    let createUrl = "/api/post_comment/"
    let postData = {...data};
    let commentData = {...postData};
    postData['post'] = parseInt(match.params.id);
    axios.post(localhost + createUrl, postData)
    .then(response => {
      let newCommentData = [commentData, ...comments];
      setComments(newCommentData);
      setData({
        name: "",
        email: "",
        body: "",
        post: ""
      });
      let commentSection = document.getElementById("commentID");
      commentSection.scrollIntoView();
    })
    .catch(error => {
        console.log(error);
    })
  };

    const fetchData = () => {
        let localhost = "http://localhost:8000";
        let postUrl = `/api/get_single_post/${match.params.id}/`
        let commentUrl = `/api/get_post_comments/${match.params.id}/`;
        axios.get(localhost + postUrl)
        .then(response => {
            setPost(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        axios.get(localhost + commentUrl)
        .then(response => {
            setComments(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    },[])

    if(loading) {
        return <div>Loading</div>
    }
    return (
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
                <p className="card-text text-justify"><strong>Posted By: </strong>{post.first_name?post.first_name:post.email}</p>
              </div>
            </div>
          </div>
        </div>

      {/* Comments */}
        <Comment comments={comments} />

      {/* Post Comment */}

      <div className="row mt-3 mb-5 pb-5">
      <div className="col-md-8 m-auto">
        <h4>Leave a comment</h4>
        <form onSubmit={handleSubmit}>
          <div className="control-group form-group">
            <div className="controls">
              <label className="text-left" style={{ float: "left" }}>
                Name*
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                id="name-comment"
                onChange={(event) =>
                  setData({ ...data, name: event.target.value })
                }
                required
              />
              <p className="help-block"></p>
            </div>
          </div>
          <div className="control-group form-group">
            <div className="controls">
              <label className="text-left" style={{ float: "left" }}>
                Email*
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={data.email}
                id="comment-email"
                onChange={(event) =>
                  setData({ ...data, email: event.target.value })
                }
                required
              />
              <p className="help-block"></p>
            </div>
          </div>
          <div className="control-group form-group">
            <div className="controls">
              <label className="text-left" style={{ float: "left" }}>
                Message*
              </label>
              <textarea
                className="form-control"
                name="body"
                value={data.body}
                id="body"
                rows={4}
                onChange={(event) =>
                  setData({ ...data, body: event.target.value })
                }
                required
              />
              <p className="help-block"></p>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary btn-block px-5"
              style={{ letterSpacing: "5px" }}
              id="create-post-btn"
            >
              Submit Comment
            </button>
          </div>
        </form>
      </div>
    </div>
      </>
    );
}
