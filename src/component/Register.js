import React, {useContext, useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {Context} from '../ContextApi';

export default function Register({history}) {
    const context = useContext(Context);
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password1: "",
        password2: ""
    });
    if(context.isUserLoggedIn) {
        return <Redirect to='/' />
    }
    return (
        <div className="row mt-5">
        <div className="col-12">
            <h4>Register with a new account</h4>
        </div>
        <div className="col-12">
            <p className="lead text-danger font-weight-bold text-capitalize pt-2" id="register-error" style={{fontSize: "1.1rem"}}></p>
        </div>
      <div className="col-md-6 m-auto">
        <form onSubmit={(event) => context.register(event, data, history)}>
        <div className="control-group form-group">
            <div className="controls">
              <label className="text-left" style={{float: "left"}}>First Name*</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={data.first_name}
                id="first_name"
                onChange={(event) => setData({...data, first_name: event.target.value})}
                required
                autoFocus={true}
                data-validation-required-message="Please enter your first name."
              />
              <p className="help-block"></p>
            </div>
          </div>
          <div className="control-group form-group">
            <div className="controls">
              <label className="text-left" style={{float: "left"}}>Last Name*</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={data.last_name}
                id="last_name"
                onChange={(event) => setData({...data, last_name: event.target.value})}
                required
                data-validation-required-message="Please enter your last name."
              />
              <p className="help-block"></p>
            </div>
          </div>
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
                name="password1"
                value={data.password1}
                id="password1"
                onChange={(event) => setData({...data, password1: event.target.value})}
                required
                data-validation-required-message="Please enter password."
              />
              <p className="help-block"></p>
            </div>
          </div>
          <div className="control-group form-group">
            <div className="controls">
              <label className="text-left" style={{float: "left"}}>Confirm Password*</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                value={data.password2}
                id="password2"
                onChange={(event) => setData({...data, password2: event.target.value})}
                required
                data-validation-required-message="Please confirm password."
              />
              <p className="help-block"></p>
            </div>
          </div>
          <div className="text-left">
          <button type="submit" className="btn btn-primary btn-md px-5" id="login-btn">
              Register
            </button>
          </div>
        </form>
        <p className="lead mt-4 pt-2 text-left">
            Already have an account ? You can
            <Link to='/login'> Login </Link>
            here !!
        </p>
      </div>
    </div>
    )
}
