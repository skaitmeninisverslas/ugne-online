import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

class Category extends Component {

constructor(props) {
  super(props);

  this.state = {
    posts: [],
    category: [],
    menu: []
 }
}

componentDidMount() {
  axios.get(`/api` + this.props.location.pathname)
    .then(res => {
      const posts = res.data.posts;
      const category = res.data.categories;
      this.setState({ posts, category });
    })
    .catch(() => {
      this.props.history.push('/')
    });
  axios.get(`/api/menu`)
  .then(res => {
    const menu = res.data;
    this.setState({menu });
  })
    .catch(() => {
      this.props.history.push('/')
    });
}

 render() {

   return (
     <div className="CONTENT">
     { this.state.menu.map(menus =>
       <Header key={menus._id} menu={menus} />
     )}

    <h2 className="CONTENT__category-title">All in "{this.state.category.title}"</h2>
    <ul className="CONTENT__blog">
    { this.state.posts.map(post =>
       <li className="CONTENT__blog-post" key={post._id} value={post.title}>
        <a className="CONTENT__blog-post-image" href={'/post/' + post.title} style={{backgroundImage: "url("+ post.image + ")"}}></a>
        <p className="CONTENT__blog-post-date">{new Date(post.createdAt).toLocaleString("en-gb", {month: "short", day: "numeric"})}</p>
        <a className="CONTENT__blog-post-link" href={'/post/' + post.title}>
          <h2 className="CONTENT__blog-post-title">{post.title}</h2>
        </a>
        <p className="CONTENT__blog-post-category">{this.state.category.title}</p>
       </li>
     )
    }
     </ul>
     { this.state.menu.map(menus =>
           <Footer key={menus._id} menu={menus} />
            )}
</div>
  )
 }
}
export default Category;
