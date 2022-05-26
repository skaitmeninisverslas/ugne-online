import React, { Component } from 'react';
import axios from 'axios';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
      page: []
   }
  }

  componentDidMount() {
   axios.get(`/api/homepage`)
   .then(res => {
     const category = res.data.categories;
     const page = res.data.pages;
     this.setState({category, page});
   })
   .catch(() => {
     this.props.history.push('/')
   });
  }

  render() {
    return(
      <div className="FOOTER">
        <div className="FOOTER__information">
          <h2 className="FOOTER__information-title">Subscribe</h2>
          <p className="FOOTER__information-text">Get updates on my lifestyle!</p>
        </div>
        <div className="FOOTER__subscribe">
        <form method="POST" action="/api/subscribers/store">
          <input className="FOOTER__subscribe-input" type="email" placeholder="Email Address" name="subscribe" />
          <button className="FOOTER__subscribe-button">Sign Up</button>
          </form>
        </div>
        <div className="MENU__information-social FOOTER__social">
          <a className="MENU__information-margin" href={this.props.menu.socials.instagram}><i className="fab fa-instagram"></i></a>
          <a href={this.props.menu.socials.facebook} ><i className="fab fa-facebook"></i></a>
        </div>
        <div className="FOOTER__copyright">Created by Mantas Jakevicius</div>
        <div className="FOOTER__menu">
          <ul>
          { this.state.category.map(category =>
            <li className="FOOTER__menu-item" key={category._id}><a href={"/categories/" + category.title}>{category.title}</a></li>
          )}
          { this.state.page.map(pages =>
            <li className="FOOTER__menu-item" key={pages._id}><a href={"/page/" + pages.title}>{pages.title}</a></li>
          )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
