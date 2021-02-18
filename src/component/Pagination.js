import React from "react";

export default function Pagination({
  firstPostofCurrentPage,
  lastPostofCurrentPage,
  numberofPosts,
  gotoPreviousPage,
  gotoNextPage,
}) {
  return (
    <ul className="pagination justify-content-center mb-1 my-2">
      <li className="page-item">
        {firstPostofCurrentPage === 0 ? (
          <button className="btn btn-primary px-4 mx-2" disabled>
            Prev
          </button>
        ) : (
          <button
            className="btn btn-primary px-4 mx-2"
            onClick={() => gotoPreviousPage()}
          >
            Prev
          </button>
        )}
      </li>
      <li className="page-item">
        {lastPostofCurrentPage >= numberofPosts ? (
          <button className="btn btn-primary px-4 mx-2" disabled>
            Next
          </button>
        ) : (
          <button
            className="btn btn-primary px-4 mx-2"
            onClick={() => gotoNextPage()}
          >
            Next
          </button>
        )}
      </li>
    </ul>
  );
}
