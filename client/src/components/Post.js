import React, { Fragment, useEffect, useState } from "react";
import { first } from "lodash-es";
import { useLocation } from "react-router-dom";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { itemNameFromLink } from "./helpers/constants";
import { useData } from "../DataContext";
import { getInstagramFeed } from "./helpers/apiCalls";
import { SubscriptionForm } from "./components/SubscriptionForm";

export const Post = () => {
  const location = useLocation();
  const { data, isLoading, authenticated } = useData();
  const [feed, setFeed] = useState();

  useEffect(() => {
    getInstagramFeed().then((res) => {
      setFeed(res.data.data);
    });
  }, []);

  const { categories, comments, menu, post } = data;

  const currentPost =
    !isLoading &&
    post.find((item) => item.title === itemNameFromLink(location));

  const relatedPosts =
    !isLoading &&
    post
      .filter(
        (item) =>
          item.category === currentPost.category && item._id !== currentPost._id
      )
      .slice(0, 3);

  const postComments =
    !isLoading && comments.filter((item) => item.post === currentPost._id);

  const currentPostCategory =
    !isLoading && categories.find((item) => item._id === currentPost.category);

  const firstPostInArray = !isLoading && first(post);

  return (
    <Fragment>
      {!isLoading ? (
        <div className="CONTENT">
          <Header />

          <div className="POST__center">
            <img className="POST__image" src={currentPost.image} alt="" />
            <p className="POST__date">
              {new Date(currentPost.createdAt).toLocaleString("en-gb", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <h2 className="POST__title">{currentPost.title}</h2>
            <a
              className="POST__category"
              href={`/categories/${currentPostCategory.title}`}
            >
              {currentPostCategory.title}
            </a>
            <div className="POST">
              <div className="POST__info">
                <div className="POST__description">
                  {currentPost.description}
                </div>
                <p className="POST__content">{currentPost.content}</p>

                <form
                  className="COMMENTS"
                  method="POST"
                  action={`/api/comments/store`}
                >
                  <input type="hidden" name="post" value={currentPost._id} />
                  <input
                    className="COMMENTS__name"
                    type="text"
                    required
                    name="user"
                    placeholder="Your name"
                  />
                  <textarea
                    className="COMMENTS__comment"
                    name="comment"
                    required
                    placeholder="Your comment"
                  ></textarea>
                  <button type="submit" className="FOOTER__subscribe-button">
                    Comment!
                  </button>
                </form>

                <div className="COMMENTS__display-title">Comments</div>

                {postComments.map((item, key) => (
                  <div className="COMMENTS__display" key={key}>
                    <div className="COMMENTS__display-name">{item.user}</div>
                    <p className="POST__date COMMENTS__display-date">
                      {new Date(item.createdAt).toLocaleString("en-gb", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                    <div className="COMMENTS__display-comment">
                      {item.comment}
                    </div>
                    {authenticated && (
                      <a
                        className="COMMENTS__display-delete right"
                        href={`/api/comments/delete/${item._id}`}
                      >
                        <i className="fas fa-trash"></i>
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="POST__sidebar">
                <div className="POST__sidebar-user">
                  <img
                    className="POST__sidebar-image rounded-circle"
                    height="200"
                    src={menu[0].image}
                    alt=""
                  />

                  <div className="POST__sidebar-author">
                    {currentPost.author}
                  </div>

                  <div className="POST__sidebar-about">{menu[0].sidebar}</div>
                </div>
                <div className="FOOTER__subscribe POST__sidebar-subscribe">
                  <div className="FOOTER__information text-left">
                    <h2 className="FOOTER__information-title">Subscribe</h2>
                    <p className="FOOTER__information-text">
                      Get updates on my lifestyle!
                    </p>
                    <p id="message" className="FOOTER__information-text d-none">
                      User are already exist!
                    </p>
                  </div>

                  <SubscriptionForm />
                </div>
                <div className="POST__sidebar-recent">Most Recent Post</div>

                <a
                  className="POST__sidebar-recent-link"
                  href={`/post/${firstPostInArray.title}`}
                >
                  <img
                    className="POST__sidebar-recent-image"
                    src={firstPostInArray.image}
                    alt=""
                  />
                  <div className="POST__sidebar-recent-title">
                    {firstPostInArray.title}
                  </div>
                </a>

                <a
                  className="POST__category POST__sidebar-recent-category"
                  href={`/categories/${currentPostCategory.title}`}
                >
                  {currentPostCategory.title}
                </a>

                <div className="POST__sidebar-recent-instagram">Instagram</div>

                <a
                  className="POST__sidebar-recent-instagram-link"
                  href={menu[0].socials.instagram}
                >
                  @ugne.online
                </a>

                <div className="POST__sidebar-recent-instagram-pictures">
                  {feed &&
                    feed.slice(0, 4).map((item, key) => (
                      <a
                        className="POST__sidebar-recent-instagram-permalink"
                        key={key}
                        href={item.permalink}
                      >
                        <img
                          className="POST__sidebar-recent-instagram-image"
                          src={item.media_url}
                          alt=""
                        />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="RELATED">
            <div className="CONTENT__blog-post-title RELATED__title text-center">
              Related Posts
            </div>
            <ul className="RELATED__posts">
              {relatedPosts.map((item, key) => (
                <li className="CONTENT__blog-post" key={key}>
                  <a
                    className="CONTENT__blog-post-image RELATED__posts-post"
                    href={`/post/${item.title}`}
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    {""}
                  </a>
                  <a
                    className="CONTENT__blog-post-link"
                    href={`/post/${item.title}`}
                  >
                    <p className="CONTENT__blog-post-date">
                      {new Date(item.createdAt).toLocaleString("en-gb", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <div className="CONTENT__blog-post-title RELATED__posts-title">
                      {item.title}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Footer />
        </div>
      ) : (
        <span className="LOADING">Loading...</span>
      )}
    </Fragment>
  );
};
