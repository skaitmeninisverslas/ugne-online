import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

class Post extends Component {

constructor(props) {
  super(props);

  this.state = {
    post: [],
    category: [],
    posts: [],
    categories: [],
    comments: [],
    menu: [],
    feed: [],
    isSigned: false
 }
}

 componentDidMount() {
  axios.get(`/api` + this.props.location.pathname)
  .then(posts => {
    const post = posts.data.post;
    const category = posts.data.category
    this.setState({ post, category });
  })
  .catch()

    axios.get(`/api/homepage`)
      .then(res => {
        const posts = res.data.post;
        const categories = res.data.categories;
        const menu = res.data.menu;
        const comments = res.data.comments;
        this.setState({ posts, categories, menu, comments });
      })
      .catch(() => {
        this.props.history.push('/')
      });
    axios.get(`https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables=%7B%22id%22:%2232976122967%22,%22first%22:4,%22after%22:null%7D`)
      .then(res => {
        const feed = res.data.data.user.edge_owner_to_timeline_media.edges;
        this.setState({ feed });
      })
      .catch(() => {
        this.props.history.push('/post/' + this.state.post.title)
      });
      axios.get(`/api/login`).then(response => {
        this.setState({isSigned: response.data})
      })
 }

 render() {
    if (!this.state.posts[0]) {
      return <span className="LOADING">Loading...</span>;
    }

   return (
    <div className="CONTENT">
    { this.state.menu.map(menus =>
      <Header key={menus._id} menu={menus} />
    )}
    <div className="POST__center">
      <img className="POST__image" src={this.state.post.image} alt="" />
      <p className="POST__date">{new Date(this.state.post.createdAt).toLocaleString("en-gb", {month: "short", day: "numeric"})}</p>
      <h2 className="POST__title">{this.state.post.title}</h2>
      <a className="POST__category" href={"/categories/" + this.state.category.title}>{this.state.category.title}</a>
        <div className="POST">
          <div className="POST__info">
            <div className="POST__description">{this.state.post.description}</div>
            <p className="POST__content">{this.state.post.content}</p>

            <form className="COMMENTS" method="POST" action="/api/comments/store">
              <input type="hidden" name="post" value={this.state.post._id} />
              <input className="COMMENTS__name" type="text" required name="user" placeholder="Your name" />
              <textarea className="COMMENTS__comment" name="comment" required placeholder="Your comment"></textarea>
              <button type="submit" className="FOOTER__subscribe-button">Comment!</button>
            </form>
          
            <div className="COMMENTS__display-title">Comments</div>

            {this.state.comments.map(com=>
              com.post === this.state.post._id ?
                <div className="COMMENTS__display" key={com._id}>
                  <div className="COMMENTS__display-name">{com.user}</div>
                  <p className="POST__date COMMENTS__display-date">{new Date(com.createdAt).toLocaleString("en-gb", {month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</p>
                  <div className="COMMENTS__display-comment">{com.comment}</div>
                  {this.state.isSigned == 'OK' ?
                  <a className="COMMENTS__display-delete right" href={"/api/comments/delete/" + com._id}><i className="fas fa-trash"></i></a>
                  : null}
                </div>
                 :
                 null
            )}
          </div>

          <div className="POST__sidebar">
            <div className="POST__sidebar-user">
              { this.state.menu.map(menus =>
                <img key={menus._id} className="POST__sidebar-image rounded-circle" height="200" src={menus.image} alt="" />
              )}
              <div className="POST__sidebar-author">{this.state.post.author}</div>
              { this.state.menu.map(menus =>
                  <div className="POST__sidebar-about" key={menus._id}>{menus.sidebar}</div>
              )}
            </div>
            <div className="FOOTER__subscribe POST__sidebar-subscribe">
              <div className="FOOTER__information text-left">
                <h2 className="FOOTER__information-title">Subscribe</h2>
                <p className="FOOTER__information-text">Get updates on my lifestyle!</p>
                <p id="message" className="FOOTER__information-text d-none">User are already exist!</p>
              </div>
              <form method="POST" action="/api/subscribers/store">
                <input className="FOOTER__subscribe-input" type="email" placeholder="Email Address" name="subscribe" />
                <button type="submit" className="FOOTER__subscribe-button">Sign Up</button>
              </form>
            </div>
            <div className="POST__sidebar-recent">Most Recent Post</div>

            <a className="POST__sidebar-recent-link" href={'/post/' + this.state.posts[0].title}>
              <img className="POST__sidebar-recent-image" src={this.state.posts[0].image} alt="" />
              <div className="POST__sidebar-recent-title">{this.state.posts[0].title}</div>
            </a>
            {this.state.categories.map(categ=>
              this.state.posts[0].category === categ._id ?
                  <a className="POST__category POST__sidebar-recent-category" key={categ._id} href={"/categories/" + categ.title}>{categ.title}</a>
                 :
                 null
            )}
            <div className="POST__sidebar-recent-instagram">Instagram</div>
            { this.state.menu.map(menus =>
              <a className="POST__sidebar-recent-instagram-link" key={menus._id} href={menus.socials.instagram}>@ugne.online</a>
            )}
            <div className="POST__sidebar-recent-instagram-pictures">
              {this.state.feed.map(item=>
                <img key={item.node.id} className="POST__sidebar-recent-instagram-image" src={item.node.thumbnail_src} alt="" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="RELATED">
        <div className="CONTENT__blog-post-title RELATED__title text-center">Related Posts</div>
        <ul className="RELATED__posts">
          { this.state.posts
            .filter(recent=> recent.category === this.state.post.category && recent._id !== this.state.post._id)
            .slice(0,3)
            .map(recent =>

            <li className="CONTENT__blog-post" key={recent._id}>
              <a className="CONTENT__blog-post-image RELATED__posts-post" href={'/post/' + recent.title} style={{backgroundImage: "url("+ recent.image + ")"}}></a>
              <a className="CONTENT__blog-post-link" href={'/post/' + recent.title}>
                <p className="CONTENT__blog-post-date">{new Date(recent.createdAt).toLocaleString("en-gb", {month: "short", day: "numeric"})}</p>
                <div className="CONTENT__blog-post-title RELATED__posts-title">{recent.title}</div>
              </a>
            </li>
          )}
        </ul>
      </div>

    { this.state.menu.map(menus =>
      <Footer key={menus._id} menu={menus} />
    )}

    </div>
   )
 }
}
export default Post;
