import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';

class Homepage extends Component {

constructor(props) {
  super(props);

  this.state = {
    posts: [],
    category: [],
    menu: []
 }
}

 componentDidMount() {
   axios.get(`/api/homepage`)
     .then(res => {
       const posts = res.data.post;
       const category = res.data.categories;
       const menu = res.data.menu;
       this.setState({ posts, category, menu });
     })
     .catch(() => {
       this.props.history.push('/')
     });
 }

 render() {

   return (
    <div className="CONTENT">
    { this.state.menu.map(menus =>
      <Header key={menus._id} menu={menus}  />
    )}

     <ul className="CONTENT__blog">
    { this.state.posts.map(post =>

       <li className="CONTENT__blog-post" key={post._id} value={post.title}>
        <a className="CONTENT__blog-post-image" href={'/post/' + post.title} style={{backgroundImage: "url("+ post.image + ")"}}></a>
        <p className="CONTENT__blog-post-date">{new Date(post.createdAt).toLocaleString("en-gb", {month: "short", day: "numeric"})}</p>
        <a className="CONTENT__blog-post-link" href={'/post/' + post.title}>
          <h2 className="CONTENT__blog-post-title">{post.title}</h2>
        </a>
        {this.state.category.map(category =>
          <a className="CONTENT__blog-post-category" href={post.category === category._id ? "/categories/" + category.title : null} key={category._id}>{post.category === category._id ? category.title : null}</a>
        )}
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
export default Homepage;
