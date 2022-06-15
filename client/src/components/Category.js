import React, { Fragment, useContext } from "react";
import { useLocation } from "react-router-dom";

import {
  bufferImageToString,
  itemNameFromLink,
  postDate,
} from "./helpers/constants";
import { usePostsData } from "./hooks/usePostsData";
import { PageContext } from "../PageContext";

export const Category = () => {
  const location = useLocation();

  const { posts } = usePostsData();
  const { categories, menu, pages } = useContext(PageContext);

  const isLoading = !categories || !posts || !menu || !pages;

  const currentCategory =
    !isLoading &&
    categories.find((item) => item.title === itemNameFromLink(location));

  const categoryPosts =
    !isLoading && posts.filter((item) => item.category === currentCategory._id);

  return (
    <Fragment>
      {!isLoading ? (
        <div className="CONTENT">
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
                  style={{
                    backgroundImage: `url(${bufferImageToString(
                      item.image.mimetype,
                      item.image.file.data
                    )})`,
                  }}
                >
                  {""}
                </a>
                <p className="CONTENT__blog-post-date">
                  {postDate(item.createdAt)}
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
        </div>
      ) : (
        <span className="LOADING">Loading...</span>
      )}
    </Fragment>
  );
};
