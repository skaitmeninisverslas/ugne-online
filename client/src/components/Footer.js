import React from "react";

export const Footer = ({ categories, pages, menu }) => {
  return (
    <div className="FOOTER">
      <div className="FOOTER__information">
        <h2 className="FOOTER__information-title">Subscribe</h2>
        <p className="FOOTER__information-text">Get updates on my lifestyle!</p>
      </div>
      <div className="FOOTER__subscribe">
        <form method="POST" action={`/api/subscribers/store`}>
          <input
            className="FOOTER__subscribe-input"
            type="email"
            placeholder="Email Address"
            name="subscribe"
          />
          <button className="FOOTER__subscribe-button">Sign Up</button>
        </form>
      </div>
      <div className="MENU__information-social FOOTER__social">
        <a className="MENU__information-margin" href={menu.socials.instagram}>
          <i className="fab fa-instagram"></i>
        </a>
        <a href={menu.socials.facebook}>
          <i className="fab fa-facebook"></i>
        </a>
      </div>
      <div className="FOOTER__copyright">Created by Mantas Jakevicius</div>
      <div className="FOOTER__menu">
        <ul>
          {categories.map((category, key) => (
            <li className="FOOTER__menu-item" key={key}>
              <a href={`/categories/${category.title}`}>{category.title}</a>
            </li>
          ))}
          {pages.map((page, key) => (
            <li className="FOOTER__menu-item" key={key}>
              <a href={`/page/${page.title}`}>{page.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
