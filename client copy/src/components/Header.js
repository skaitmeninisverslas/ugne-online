import React, { Component } from "react";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
      page: [],
      addClass: false,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/homepage`)
      .then((res) => {
        const category = res.data.categories;
        const page = res.data.pages;
        this.setState({ category, page });
      })
      .catch(() => {
        this.props.history.push("/");
      });
  }

  toggle() {
    this.setState({ addClass: !this.state.addClass });
  }

  render() {
    let boxClass = ["hide"];
    if (this.state.addClass) {
      boxClass.push("show");
    }
    return (
      <div className="TOPBAR">
        <div onClick={this.toggle.bind(this)} className="TOPBAR__button">
          <span className={"cross " + boxClass.join(" ")}></span>
          <span className={"open " + boxClass.join(" ")}></span>
          <span className={"cross " + boxClass.join(" ")}></span>
        </div>
        <a className="TOPBAR__branding" href="/">
          Demo
        </a>
        <div className="TOPBAR__socials">
          <a href={this.props.menu.socials.instagram}>
            <i className="fab fa-instagram"></i>
          </a>
          <a
            className="TOPBAR__socials-border"
            href={this.props.menu.socials.facebook}
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a className="search" href={this.props.menu.socials.facebook}>
            <i className="fas fa-search"></i>
          </a>
        </div>
        <div className={"MENU " + boxClass.join(" ")}>
          <div className="MENU__first">
            <ul>
              {this.state.category.map((category) => (
                <li key={category._id} className="MENU__item">
                  <a href={"/categories/" + category.title}>{category.title}</a>
                </li>
              ))}
              {this.state.page.map((pages) => (
                <li key={pages._id} className="MENU__item">
                  <a href={"/page/" + pages.title}>{pages.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="MENU__second">
            <div className="MENU__information">
              <div className="MENU__information-image">
                <img
                  className="rounded-circle"
                  src={this.props.menu.image}
                  alt=""
                />
              </div>
              <div className="MENU__information-heading">
                {this.props.menu.title}
              </div>
              <div className="MENU__information-text">
                {this.props.menu.about}
              </div>
              <div className="MENU__information-social">
                <a
                  className="MENU__information-margin"
                  href={this.props.menu.socials.instagram}
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a href={this.props.menu.socials.facebook}>
                  <i className="fab fa-facebook"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
