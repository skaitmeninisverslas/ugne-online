import React, { Fragment, useContext } from "react";

import { bufferImageToString, postDate } from "./helpers/constants";
import { usePostsData } from "./hooks/usePostsData";
import { PageContext } from "../PageContext";

export const Homepage = () => {
  const { posts } = usePostsData();
  const { categories } = useContext(PageContext);

  const isLoading = !posts || !categories;

  return (
    <Fragment>
      {!isLoading ? (
        <div className="CONTENT">
          <ul className="CONTENT__blog">
            {posts.map((item, key) => {
              const postCategory = categories.find(
                (category) => category._id === item.category
              );

              return (
                <li className="CONTENT__blog-post" key={key} value={item.title}>
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

                  <a
                    className="CONTENT__blog-post-category"
                    href={`/categories/${postCategory.title}`}
                    key={key}
                  >
                    {postCategory.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <span className="LOADING">Loading...</span>
      )}
    </Fragment>
  );
};
