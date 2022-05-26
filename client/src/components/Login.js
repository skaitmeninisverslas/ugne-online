import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSigned: false
    }
  }

  componentDidMount() {
    axios.get(`/api/login`).then(response => {
      this.setState({isSigned: response.data})
    })
    .catch(() => {
      this.props.history.push('/login')
    })
  }

  render() {

    if (this.state.isSigned === 'OK') {
      return <Redirect to = {{pathname: "/admin"}} />;
    }

    return (
    <div className="container h-100 d-flex">
      <div className="jumbotron m-auto">
        <div className="container">
          <h3 className="display-6">Please Sign in</h3>
        </div>
        <form action="/api/users/login" className="mt-4" method="POST" encType="multipart/form-data">

              <div className="form-group">
                <label>Email</label>
                <input className="form-control" type="email" name="email" placeholder="Email" />
              </div>


              <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" name="password" placeholder="Password"  />
              </div>

            <div className="form-group text-center">
              <input className="btn btn-secondary" type="submit" value="Login"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
