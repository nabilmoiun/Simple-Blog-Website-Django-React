import React, { useState, useContext } from "react";
import {Redirect} from 'react-router-dom';
import { Context } from "../ContextApi";
import axios from 'axios';

export default function PostCreate({history}) {

    const context = useContext(Context);

    const [data, setData] = useState({
        user: "",
        title: "",
        body: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        let localhost = "http://localhost:8000";
        let createUrl = "/api/create_post/"
        let token = context.token;
        let user_id = context.user;
        let postData = {...data};
        postData['user'] = parseInt(user_id);
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
        axios.post(localhost + createUrl, postData, config)
        .then(response => {
            history.push(`/user_posts/${response.data['id']}`);
        })
        .catch(error => {
            console.log(error);
        })
    };
    
    if(!context.isUserLoggedIn) {
        return <Redirect to='/login' />
    }
  return (
    <div className="row mt-5">
      <div className="col-md-8 m-auto">
        <form onSubmit={handleSubmit}>
          <div className="control-group form-group">
            <div className="controls">
              <label className="text-left" style={{ float: "left" }}>
                Post Title*
              </label>
              <input
                className="form-control"
                name="title"
                value={data.title}
                id="title"
                onChange={(event) =>
                  setData({ ...data, title: event.target.value })
                }
                required
                autoFocus={true}
              />
              <p className="help-block"></p>
            </div>
          </div>
          <div className="control-group form-group">
            <div className="controls">
              <label className="text-left" style={{ float: "left" }}>
                Post Body*
              </label>
              <textarea
                className="form-control"
                name="body"
                value={data.body}
                id="body"
                rows={10}
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
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
