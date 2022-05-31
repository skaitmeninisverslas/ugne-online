import React, { Fragment, useEffect, useState } from "react";

import { getAllData } from "./helpers/apiCalls";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    getAllData().then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  const { categories, menu, post, pages } = data;

  return (
    <Fragment>
      {!isLoading ? (
        <div className="CONTENT">
          <Header menu={menu[0]} categories={categories} pages={pages} />

          <ul className="CONTENT__blog">
            {post.map((item, key) => {
              const postCategory = categories.find(
                (category) => category._id === item.category
              );

              return (
                <li className="CONTENT__blog-post" key={key} value={item.title}>
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

          <Footer menu={menu[0]} categories={categories} pages={pages} />
        </div>
      ) : (
        <span className="LOADING">Loading...</span>
      )}
    </Fragment>
  );
};
