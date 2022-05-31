import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { itemNameFromLink } from "./helpers/constants";
import { getAllData } from "./helpers/apiCalls";

export const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const location = useLocation();

  useEffect(() => {
    getAllData().then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  const { categories, menu, post, pages } = data;

  const currentCategory =
    !isLoading &&
    categories.find((item) => item.title === itemNameFromLink(location));
  const categoryPosts =
    !isLoading && post.filter((item) => item.category === currentCategory._id);

  return (
    <Fragment>
      {!isLoading ? (
        <div className="CONTENT">
          <Header menu={menu[0]} categories={categories} pages={pages} />

          <h2 className="CONTENT__category-title">
            All in "{currentCategory.title}"
          </h2>
          <ul className="CONTENT__blog">
            {categoryPosts.map((item) => (
              <li
                className="CONTENT__blog-post"
                key={item._id}
                value={item.title}
              >
                <a
                  className="CONTENT__blog-post-image"
                  href={`/post/${item.title}`}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  {""}
                </a>
                <p className="CONTENT__blog-post-date">
                  {new Date(item.createdAt).toLocaleString("en-gb", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <a
                  className="CONTENT__blog-post-link"
                  href={`/post/${item.title}`}
                >
                  <h2 className="CONTENT__blog-post-title">{item.title}</h2>
                </a>
                <p className="CONTENT__blog-post-category">
                  {currentCategory.title}
                </p>
              </li>
            ))}
          </ul>

          <Footer menu={menu[0]} categories={categories} pages={pages} />
        </div>
      ) : (
        <span className="LOADING">Loading...</span>
      )}
    </Fragment>
  );
};
