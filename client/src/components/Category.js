import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { itemNameFromLink } from "./helpers/constants";
import { useData } from "../DataContext";

export const Category = () => {
  const { data, isLoading } = useData();
  const location = useLocation();

  const { categories, post } = data;

  const currentCategory =
    !isLoading &&
    categories.find((item) => item.title === itemNameFromLink(location));
  const categoryPosts =
    !isLoading && post.filter((item) => item.category === currentCategory._id);

  return (
    <Fragment>
      {!isLoading ? (
        <div className="CONTENT">
          <Header />

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

          <Footer />
        </div>
      ) : (
        <span className="LOADING">Loading...</span>
      )}
    </Fragment>
  );
};
