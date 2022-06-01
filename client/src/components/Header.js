import React, { useState } from "react";
import { useData } from "../DataContext";

export const Header = () => {
  const [addClass, setAddClass] = useState(false);
  const {
    data: { menu, categories, pages },
    authenticated,
  } = useData();

  const toggle = () => {
    setAddClass(!addClass);
  };

  const isShow = addClass ? "show" : "hide";

  return (
    <div className="TOPBAR" style={{ marginTop: authenticated ? "44px" : 0 }}>
      <div onClick={toggle} className="TOPBAR__button">
        <span className={`cross ${isShow}`}></span>
        <span className={`open ${isShow}`}></span>
        <span className={`cross ${isShow}`}></span>
      </div>
      <a className="TOPBAR__branding" href="/">
        Demo
      </a>
      <div className="TOPBAR__socials">
        <a href={menu[0].socials.instagram}>
          <i className="fab fa-instagram"></i>
        </a>
        <a className="TOPBAR__socials-border" href={menu[0].socials.facebook}>
          <i className="fab fa-facebook"></i>
        </a>
        <a className="search" href={menu[0].socials.facebook}>
          <i className="fas fa-search"></i>
        </a>
      </div>
      <div className={`MENU ${isShow}`}>
        <div className="MENU__first">
          <ul>
            {categories.map((category, key) => (
              <li key={key} className="MENU__item">
                <a href={`/categories/${category.title}`}>{category.title}</a>
              </li>
            ))}

            {pages.map((page, key) => (
              <li key={key} className="MENU__item">
                <a href={`/page/${page.title}`}>{page.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="MENU__second">
          <div className="MENU__information">
            <div className="MENU__information-image">
              <img className="rounded-circle" src={menu[0].image} alt="" />
            </div>
            <div className="MENU__information-heading">{menu[0].title}</div>
            <div className="MENU__information-text">{menu[0].about}</div>
            <div className="MENU__information-social">
              <a
                className="MENU__information-margin"
                href={menu[0].socials.instagram}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a href={menu[0].socials.facebook}>
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {authenticated && (
        <div className="TOPBAR__admin">
          <a href={"/admin"} className="TOPBAR__admin-link">
            Dashboard
          </a>
          <a href="/api/auth/logout" className="TOPBAR__admin-logout">
            <i className="fas fa-sign-out-alt text-white"></i>
          </a>
        </div>
      )}
    </div>
  );
};
