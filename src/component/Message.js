import React from 'react'

export default function Message({message, hideMessage}) {
    return (
        <div className="container">
          <div className="mt-3 pt-2" id="message-div">
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{message}</strong>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span
                  id="message-close"
                  aria-hidden="true"
                  onClick={() => hideMessage()}
                >
                  &times;
                </span>
              </button>
            </div>
          </div>
        </div>
    )
}
