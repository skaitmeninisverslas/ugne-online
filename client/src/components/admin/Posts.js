import React, { Component } from 'react';
import axios from 'axios';

class Posts extends Component {

constructor(props) {
  super(props);

  this.state = {
    posts: [],
    category: [],
    isSigned: false
 }
}

 componentDidMount() {
   axios.get(`/api/homepage`)
     .then(res => {
       const posts = res.data.post;
       const category = res.data.categories;
       this.setState({ posts, category });
     })
     .catch(() => {
       this.props.history.push('/login')
     });

   axios.get(`/api/posts/new`)
   .then(res => {
        if (res.status === 200) {
          this.setState({isSigned: true});
        }
      })
     .catch(() => {

     })
 }

 render() {

   return (

     <div className="w-100">

      <h2 className="text-center">All Posts</h2>

      <button className="btn btn-light mt-4" data-toggle="modal" data-target="#createPost">
       <i className="fas fa-plus"></i> New Post
      </button>

      <ul className="mt-4 p-0">
         { this.state.posts.map(post =>
           <li className="card mt-2 p-3" key={post._id} value={post.title}>
              <div className="card-body row">

              <div className="col-11">
                <div className="card-title border-bottom pb-2 font-weight-bold">{post.title}</div>
                <div className="card-subtitle text-muted">{post.description}</div>
              </div>

              <div className="d-flex flex-column ml-auto border-left pl-4">
                <button data-toggle="modal" data-target={"#edit" + post._id} className="btn btn-primary">
                  <i className="fas fa-pen"></i>
                </button>
                <button data-toggle="modal" data-target={"#delete" + post._id} className="btn btn-danger mt-2">
                  <i className="fas fa-trash"></i>
                </button>
              </div>

            </div>

            <div className="modal fade" id={'delete' + post._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-center" id="exampleModalLabel">Warning!</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Are you sure, do you want to delete post: {post.title}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <a type="button" href={'/api/post/delete/' + post._id} className="btn btn-danger">Delete</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id={'edit' + post._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <form className="mt-4" action={"/api/post/edit/" + post._id} method="POST" encType="multipart/form-data">
                  <div className="modal-header">
                    <h5 className="modal-title text-center" id="exampleModalLabel">Edit {post.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">

                     <div className="form-group">
                        <label>Title</label>
                        <input className="form-control" type="text" name="title" placeholder="Title" defaultValue={post.title} />
                     </div>

                     <div className="form-group">
                         <label>
                           Category
                         </label>
                        <select className="form-control" name="category" defaultValue={post.category}>
                          { this.state.category.map(categories => <option key={categories._id} value={categories._id}>{categories.title}</option>) }
                        </select>
                     </div>

                     <div className="form-group">
                        <label>Description</label>
                        <input className="form-control" type="text" name="description" placeholder="Description" defaultValue={post.description}/>
                      </div>

                     <div className="form-group">
                        <label>Content</label>
                        <textarea className="form-control mb-3" name="content" placeholder="Content ..." cols="30" rows="10" defaultValue={post.content}></textarea>
                        <img src={post.image} className="rounded d-block m-auto" width="200" alt="" />
                      </div>

                      <div className="input-group">
                        <div className="input-group-prepend">
                         <span className="input-group-text">Upload</span>
                        </div>
                        <div className="form-group custom-file">
                          <input className="custom-file-input" type="file" id="customFile" name="image" />
                          <label className="custom-file-label" htmlFor="customFile">Choose image</label>
                        </div>
                      </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button className="btn btn-success" type="submit">
                     <i className='fas fa-save'></i> Save
                    </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
           </li>
         )
       }
      </ul>

      <div className="modal fade" id="createPost" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
          <form className="mt-4" action="/api/posts/store" method="POST" encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">Create New Post</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

               <div className="form-group">
                  <label>Title</label>
                  <input className="form-control" type="text" name="title" placeholder="Title" />
               </div>

               <div className="form-group">
                   <label>
                     Category
                   </label>
                  <select className="form-control" name="category">
                    { this.state.category.map(categories => <option key={categories._id} value={categories._id}>{categories.title}</option>) }
                  </select>
               </div>

               <div className="form-group">
                  <label>Description</label>
                  <input className="form-control" type="text" name="description" placeholder="Description" />
                </div>

               <div className="form-group">
                  <label>Content</label>
                  <textarea className="form-control" name="content" placeholder="Content ..." cols="30" rows="10"></textarea>
                </div>

                <div className="input-group">
                  <div className="input-group-prepend">
                   <span className="input-group-text">Upload</span>
                  </div>

                <div className="form-group custom-file">
                  <input className="custom-file-input" type="file" id="customFile" name="image" />
                  <label className="custom-file-label" htmlFor="customFile">Choose image</label>
                </div>

                </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button className="btn btn-success" type="submit">
               <i className='fas fa-save'></i> Post
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>

      </div>

   )
 }
}
export default Posts;
