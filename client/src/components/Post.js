import React, { Fragment, useContext, useEffect, useState } from "react";
import { first } from "lodash-es";
import { useLocation } from "react-router-dom";

import {
  bufferImageToString,
  commentDate,
  itemNameFromLink,
  postDate,
} from "./helpers/constants";
import { getInstagramFeed } from "./helpers/apiCalls";
import { SubscriptionForm } from "./components/SubscriptionForm";
import { useAuthentication } from "./hooks/useAuthentication";
import { usePostsData } from "./hooks/usePostsData";
import { PageContext } from "../PageContext";
import { useCommentsData } from "./hooks/useCommentsData";

export const Post = () => {
  const [feed, setFeed] = useState();
  const location = useLocation();
  const { authenticated } = useAuthentication();
  const { posts } = usePostsData();
  const { comments } = useCommentsData();
  const { categories, menu, pages } = useContext(PageContext);

  useEffect(() => {
    getInstagramFeed().then((res) => {
      setFeed(res.data.data);
    });
  }, []);

  const isLoading = !menu || !categories || !posts || !pages;

  const currentPost =
    !isLoading &&
    posts.find((item) => item.title === itemNameFromLink(location));

  const relatedPosts =
    !isLoading &&
    posts
      .filter(
        (item) =>
          item.category === currentPost.category && item._id !== currentPost._id
      )
      .slice(0, 3);

  const currentPostComments =
    comments && comments.filter((item) => item.post === currentPost._id);

  const currentPostCategory =
    !isLoading && categories.find((item) => item._id === currentPost.category);

  const firstPostInArray = !isLoading && first(posts);

  const postComments = () => {
    return (
      <Fragment>
        <div className="COMMENTS__display-title">Comments</div>

        {currentPostComments.map((item, key) => (
          <div className="COMMENTS__display" key={key}>
            <div className="COMMENTS__display-name">{item.user}</div>
            <p className="POST__date COMMENTS__display-date">
              {commentDate(item.createdAt)}
            </p>
            <div className="COMMENTS__display-comment">{item.comment}</div>
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
      </Fragment>
    );
  };

  return (
    <Fragment>
      {!isLoading ? (
        <div className="CONTENT">
          <div className="POST__center">
            <img
              className="POST__image"
              src={bufferImageToString(
                currentPost.image.mimetype,
                currentPost.image.file.data
              )}
              alt=""
            />
            <p className="POST__date">{postDate(currentPost.createdAt)}</p>
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

                {currentPostComments && postComments()}
              </div>

              <div className="POST__sidebar">
                <div className="POST__sidebar-user">
                  <img
                    className="POST__sidebar-image rounded-circle"
                    height="200"
                    src={bufferImageToString(
                      menu.image.mimetype,
                      menu.image.file.data
                    )}
                    alt=""
                  />

                  <div className="POST__sidebar-author">
                    {currentPost.author}
                  </div>

                  <div className="POST__sidebar-about">{menu.sidebar}</div>
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
                    src={bufferImageToString(
                      firstPostInArray.image.mimetype,
                      firstPostInArray.image.file.data
                    )}
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
                  href={menu.socials.instagram}
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
                    style={{
                      backgroundImage: `url(${bufferImageToString(
                        item.image.mimetype,
                        item.image.file.data
                      )})`,
                    }}
                  >
                    {""}
                  </a>
                  <a
                    className="CONTENT__blog-post-link"
                    href={`/post/${item.title}`}
                  >
                    <p className="CONTENT__blog-post-date">
                      {postDate(item.createdAt)}
                    </p>
                    <div className="CONTENT__blog-post-title RELATED__posts-title">
                      {item.title}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <span className="LOADING">Loading...</span>
      )}
    </Fragment>
  );
};
