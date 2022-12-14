import React, { Fragment, useState } from "react";

import { bufferImageToString } from "./helpers/constants";
import { useAuthentication } from "./hooks/useAuthentication";

export const Header = ({ menu, categories, pages }) => {
  const [addClass, setAddClass] = useState(false);
  const { authenticated } = useAuthentication();

  const toggle = () => {
    setAddClass(!addClass);
  };

  const isShow = addClass ? "show" : "hide";

  const isLoading = !menu || !categories || !pages;

  return (
    <Fragment>
      {!isLoading && (
        <div
          className="TOPBAR"
          style={{ marginTop: authenticated ? "44px" : 0 }}
        >
          <div onClick={toggle} className="TOPBAR__button">
            <span className={`cross ${isShow}`}></span>
            <span className={`open ${isShow}`}></span>
            <span className={`cross ${isShow}`}></span>
          </div>
          <a className="TOPBAR__branding" href="/">
            Demo
          </a>
          <div className="TOPBAR__socials">
            <a href={menu.socials.instagram}>
              <i className="fab fa-instagram"></i>
            </a>
            <a className="TOPBAR__socials-border" href={menu.socials.facebook}>
              <i className="fab fa-facebook"></i>
            </a>
            <a className="search" href={menu.socials.facebook}>
              <i className="fas fa-search"></i>
            </a>
          </div>
          <div className={`MENU ${isShow}`}>
            <div className="MENU__first">
              <ul>
                {categories.map((category, key) => (
                  <li key={key} className="MENU__item">
                    <a href={`/categories/${category.title}`}>
                      {category.title}
                    </a>
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
                  <img
                    className="rounded-circle"
                    src={bufferImageToString(
                      menu.image.mimetype,
                      menu.image.file.data
                    )}
                    alt=""
                  />
                </div>
                <div className="MENU__information-heading">{menu.title}</div>
                <div className="MENU__information-text">{menu.about}</div>
                <div className="MENU__information-social">
                  <a
                    className="MENU__information-margin"
                    href={menu.socials.instagram}
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href={menu.socials.facebook}>
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
      )}
    </Fragment>
  );
};
