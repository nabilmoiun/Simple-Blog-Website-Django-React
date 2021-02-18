import React from 'react'
import loading from '../loading.gif';
export default function Loading() {
    return (
        <div className="d-flex flex-column justify-content-center">
            <img src={loading} className="img-fluid" alt=""></img>
            <h4 className="text-center">Loading</h4>
        </div>
    )
}
