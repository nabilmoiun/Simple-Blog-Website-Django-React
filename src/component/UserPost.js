import React, { useState, useEffect } from "react";
import Post from "./Post";
import Loading from "./Loading";
import Pagination from "./Pagination";
import axios from "axios";

export default function UserPost() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const postPerPage = 4;
  const numberofPosts = posts.length;
  const [firstPostofCurrentPage, setFirstPost] = useState(parseInt(0));
  const [lastPostofCurrentPage, setLastPost] = useState(parseInt(postPerPage));

  const gotoNextPage = () => {
    setFirstPost(firstPostofCurrentPage + postPerPage);
    setLastPost(lastPostofCurrentPage + postPerPage);
  };

  const gotoPreviousPage = () => {
    setFirstPost(firstPostofCurrentPage - postPerPage);
    setLastPost(lastPostofCurrentPage - postPerPage);
  };

  const fetchPost = () => {
    let localhost = "http://localhost:8000";
    let endpoint = "/api/get_posts/";
    axios
      .get(localhost + endpoint)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="row my-4">
        <div className="col-12">
          <h4>Posts From Djagno App</h4>
        </div>
      </div>
      <Pagination
        firstPostofCurrentPage={firstPostofCurrentPage}
        lastPostofCurrentPage={lastPostofCurrentPage}
        numberofPosts={numberofPosts}
        gotoPreviousPage={gotoPreviousPage}
        gotoNextPage={gotoNextPage}
      />
      {posts
        .slice(firstPostofCurrentPage, lastPostofCurrentPage)
        .map((post) => (
          <Post post={post} key={post.id} endpoint="/user_posts/" />
        ))}
    </>
  );
}
