import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { itemNameFromLink } from "./helpers/constants";
import { useData } from "../DataContext";

export const Page = () => {
  const location = useLocation();
  const { data, isLoading } = useData();

  const { menu, pages } = data;

  const currentPage =
    !isLoading &&
    pages.find((item) => item.title === itemNameFromLink(location));

  return (
    <Fragment>
      {!isLoading ? (
        <div className="CONTENT">
          <Header />

          {!currentPage.image && !currentPage.subtitle ? (
            <div className="PAGE">
              <div className="PAGE__title no-image">{currentPage.title}</div>
              <div className="PAGE__content no-image">
                {currentPage.content}
              </div>

              <a href={`mailto:${menu[0].email}`} className="PAGE__email">
                {menu[0].email}
              </a>
            </div>
          ) : (
            <div className="PAGE">
              <div className="PAGE__title image">{currentPage.title}</div>
              <img className="PAGE__image" src={currentPage.image} alt="" />
              <div className="PAGE__center">
                <div className="PAGE__subtitle">{currentPage.subtitle}</div>
                <div className="PAGE__content image">{currentPage.content}</div>
              </div>
            </div>
          )}

          <Footer />
        </div>
      ) : (
        <span className="LOADING">Loading...</span>
      )}
    </Fragment>
  );
};
