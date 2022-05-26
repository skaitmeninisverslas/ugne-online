import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

class Page extends Component {

constructor(props) {
  super(props);

  this.state = {
    page: [],
    menu: []
 }
}

 componentDidMount() {
  axios.get(`/api` + this.props.location.pathname)
  .then(res => {
    const page = res.data.page;
    this.setState({ page });
  })
  .catch()

  axios.get(`/api/menu`)
  .then(res => {
    const menu = res.data;
    this.setState({ menu });
  })
    .catch(() => {
      this.props.history.push('/')
    });
 }

 render() {
   return (
    <div className="CONTENT">
    { this.state.menu.map(menus =>
      <Header key={menus._id} menu={menus} />
    )}

    {!this.state.page.image && !this.state.page.subtitle ?
      <div className="PAGE">
        <div className="PAGE__title no-image">{this.state.page.title}</div>
        <div className="PAGE__content no-image">{this.state.page.content}</div>
        { this.state.menu.map(menus =>
         <a key={menus._id} href={"mailto:" + menus.email} className="PAGE__email">{menus.email}</a>
        )}
      </div>
      :
      <div className="PAGE">
        <div className="PAGE__title image">{this.state.page.title}</div>
        <img className="PAGE__image" src={this.state.page.image} alt=""/>
        <div className="PAGE__center">
          <div className="PAGE__subtitle">{this.state.page.subtitle}</div>
          <div className="PAGE__content image">{this.state.page.content}</div>
        </div>
      </div>
    }

    { this.state.menu.map(menus =>
      <Footer key={menus._id} menu={menus} />
    )}
    </div>
   )
 }
}
export default Page;
