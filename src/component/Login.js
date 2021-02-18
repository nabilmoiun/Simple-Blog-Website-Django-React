import React, { useContext, useState } from "react";
import { Context } from "../ContextApi";
import {Link, Redirect} from 'react-router-dom';

export default function Login() {
  const context = useContext(Context);
  const [data, setData] = useState({
      email: "",
      password: ""
  });
  if(context.isUserLoggedIn) {
      return <Redirect to='/' />
  }
  return (
    <div className="row mt-5">
        <div className="col-12">
            <h4>Login to your account</h4>
        </div>
        <div className="col-12">
          <p className="lead text-danger font-weight-bold pt-2" id='login-error'></p>
        </div>
      <div className="col-md-6 m-auto">
        <form onSubmit={(event) => context.login(event, data)}>
          <div className="control-group form-group">
            <div className="controls">
              <label className="text-left" style={{float: "left"}}>Email*</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={data.email}
                id="email"
                onChange={(event) => setData({...data, email: event.target.value})}
                required
                autoFocus={true}
                data-validation-required-message="Please enter your email."
              />
              <p className="help-block"></p>
            </div>
          </div>
          <div className="control-group form-group">
            <div className="controls">
              <label className="text-left" style={{float: "left"}}>Password*</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={data.password}
                id="password"
                onChange={(event) => setData({...data, password: event.target.value})}
                required
                data-validation-required-message="Please enter your password."
              />
              <p className="help-block"></p>
            </div>
          </div>
          <div className="text-left">
          <button type="submit" className="btn btn-primary btn-md px-5" id="login-btn">
              Login
            </button>
          </div>
        </form>
        <p className="lead mt-4 pt-2 text-left">
            If you don't have an account ? You can
            <Link to='/register'> Register </Link>
            here !!
        </p>
      </div>
    </div>
  );
}
