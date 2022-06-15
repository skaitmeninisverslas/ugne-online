import React, { Fragment, useContext } from "react";
import { useLocation } from "react-router-dom";

import { bufferImageToString, itemNameFromLink } from "./helpers/constants";
import { PageContext } from "../PageContext";

export const Page = () => {
  const location = useLocation();

  const { categories, pages, menu } = useContext(PageContext);

  const isLoading = !menu || !pages || !categories;

  const currentPage =
    !isLoading &&
    pages.find((item) => item.title === itemNameFromLink(location));

  return (
    <Fragment>
      {!isLoading ? (
        <div className="CONTENT">
          {!currentPage.image && !currentPage.subtitle ? (
            <div className="PAGE">
              <div className="PAGE__title no-image">{currentPage.title}</div>
              <div className="PAGE__content no-image">
                {currentPage.content}
              </div>

              <a href={`mailto:${menu.email}`} className="PAGE__email">
                {menu.email}
              </a>
            </div>
          ) : (
            <div className="PAGE">
              <div className="PAGE__title image">{currentPage.title}</div>
              <img
                className="PAGE__image"
                src={bufferImageToString(
                  currentPage.image.mimetype,
                  currentPage.image.file.data
                )}
                alt=""
              />
              <div className="PAGE__center">
                <div className="PAGE__subtitle">{currentPage.subtitle}</div>
                <div className="PAGE__content image">{currentPage.content}</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <span className="LOADING">Loading...</span>
      )}
    </Fragment>
  );
};
