import React, { Component } from 'react';
import Categories from './Categories';
import Posts from './Posts';
import User from './User';
import Menu from './Menu';
import Subscribers from './Subscribers';
import Pages from './Pages';
import Comments from './Comments';
import axios from 'axios';

import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js/dist/popper.min.js'

class Admin extends Component {

  constructor(props) {
      super(props);
      this.state = {
        showComponent:'posts',
        isSigned: false
      };
      this._onButtonClick = this._onButtonClick.bind(this);
    }

    componentDidMount() {
      axios.get(`/api/login`).then(response => {
        this.setState({isSigned: response.data})
      })
      .then(() => {
        if (this.state.isSigned !== 'OK') {
          this.props.history.push('/login')
        }
      })
      .catch(() => {
        this.props.history.push('/login')
      })
    }

    _onButtonClick(event) {
      this.setState({
        showComponent: event.target.name
      });
    }

    render() {
      return (
        <div className="h-100 container-fluid admin">

          <div className="row h-100">
          <ul className="overflow-auto p-3 col-lg-2 col-md-3 col-sm-4 h-100 bg-dark d-flex flex-column justify-content-center mb-0" style={{listStyleType: "none"}}>
            <h2 className="text-white mt-4 text-center">Admin Panel</h2>
            <li className="mt-auto">
              <a href="/" className="d-block link text-center text-white text-decoration-none"><i className="fas fa-arrow-alt-circle-left text-white"></i> Back to Homepage</a>
            </li>
            <li className="mt-3">
              <button className="text-sm-right btn btn-light w-100" onClick={this._onButtonClick} name="posts"><i className="fas fa-copy"></i> Posts</button>
            </li>
            <li className="mt-3">
              <button className="text-sm-right btn btn-light w-100" onClick={this._onButtonClick} name="pages"><i className="fas fa-copy"></i> Pages</button>
            </li>
            <li className="mt-3">
              <button className="text-sm-right btn btn-light w-100" onClick={this._onButtonClick} name="categories"><i className="fas fa-folder"></i> Categories</button>
            </li>
            <li className="mt-3">
              <button className="text-sm-right btn btn-light w-100" onClick={this._onButtonClick} name="user"><i className="fas fa-user"></i> User Account</button>
            </li>
            <li className="mt-3">
              <button className="text-sm-right btn btn-light w-100" onClick={this._onButtonClick} name="menu"><i className="fas fa-ellipsis-h"></i> Menu</button>
            </li>
            <li className="mt-3">
              <button className="text-sm-right btn btn-light w-100" onClick={this._onButtonClick} name="subscribers"><i className="fas fa-user"></i> Subscribers</button>
            </li>
            <li className="my-3">
              <button className="text-sm-right btn btn-light w-100" onClick={this._onButtonClick} name="comments"><i className="fas fa-comments"></i> Comments</button>
            </li>
            <li className="mt-auto align-self-end">
             <a className="btn btn-danger" href="/api/auth/logout">Logout <i className="fas fa-sign-out-alt"></i></a>
            </li>
          </ul>
          <div className="col-lg-10 col-md-9 col-sm-8 p-4 h-100 overflow-auto">
            {this.state.showComponent === "posts" && this.state.isSigned === 'OK' ?
               <Posts /> :
               null
            }
            {this.state.showComponent === "pages" && this.state.isSigned === 'OK' ?
               <Pages /> :
               null
            }
            {this.state.showComponent === "categories" && this.state.isSigned === 'OK' ?
                <Categories />
               :
               null
            }
            {this.state.showComponent === "user" && this.state.isSigned === 'OK' ?
                <User />
               :
               null
            }
            {this.state.showComponent === "comments" && this.state.isSigned === 'OK' ?
                <Comments />
               :
               null
            }
            {this.state.showComponent === "menu" && this.state.isSigned === 'OK' ?
                <Menu />
               :
               null
            }
            {this.state.showComponent === "subscribers" && this.state.isSigned === 'OK' ?
                <Subscribers />
               :
               null
            }
          </div>
         </div>
        </div>
      );
    }
}
export default Admin;
