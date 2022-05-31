import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { itemNameFromLink } from "./helpers/constants";
import { getAllData } from "./helpers/apiCalls";

export const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const location = useLocation();

  useEffect(() => {
    getAllData().then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  const { categories, menu, pages } = data;

  const currentPage =
    !isLoading &&
    pages.find((item) => item.title === itemNameFromLink(location));

  return (
    <Fragment>
      {!isLoading ? (
        <div className="CONTENT">
          <Header menu={menu[0]} categories={categories} pages={pages} />

          {!currentPage.image && !currentPage.subtitle ? (
            <div className="PAGE">
              <div className="PAGE__title no-image">{currentPage.title}</div>
              <div className="PAGE__content no-image">
                {currentPage.content}
              </div>

              <a
                key={menu[0]._id}
                href={`mailto:${menu[0].email}`}
                className="PAGE__email"
              >
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

          <Footer menu={menu[0]} categories={categories} pages={pages} />
        </div>
      ) : (
        <span className="LOADING">Loading...</span>
      )}
    </Fragment>
  );
};
