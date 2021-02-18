import React from "react";

export default function Comment({ comments }) {
  let totalComments = comments.map((comment) => {
    return (
      <div className="media my-4 border rounded py-2" key={comment.id}>
        <img
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
          alt=""
          className="img-fluid rounded m-auto"
          style={{ width: "80px", height: "80px" }}
        />
        <div className="media-body text-left px-4">
          <p className="text-justify"><strong>Comment: </strong>{comment.body}</p>
          <p>
            <strong>Name: </strong>{comment.name}
          </p>
          <p>
          <strong>Email: </strong>{comment.email}
          </p>
        </div>
      </div>
    );
  });
  return (
    <div className="row mt-2 justify-content-center">
      <div className="col-md-8 mt-4">
  <h4 className="mb-4" id="commentID">{comments.length}&nbsp;Comments</h4>
        {totalComments}
      </div>
    </div>
  );
}
