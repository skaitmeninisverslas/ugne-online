import React, { Component } from 'react';
import axios from 'axios';

class Pages extends Component {

constructor(props) {
  super(props);

  this.state = {
    pages: [],
    isSigned: false
 }
}

 componentDidMount() {
   axios.get(`/api/homepage`)
     .then(res => {
       const pages = res.data.pages;
       this.setState({ pages });
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

      <h2 className="text-center">All Pages</h2>

      <button className="btn btn-light mt-4" data-toggle="modal" data-target="#createPage">
       <i className="fas fa-plus"></i> New Page
      </button>

      <ul className="mt-4 p-0">
         { this.state.pages.map(page =>
           <li className="card mt-2 p-3" key={page._id} value={page.title}>
              <div className="card-body row">

              <div className="col-11">
                <div className="card-title border-bottom pb-2 font-weight-bold">{page.title}</div>
                <div className="card-subtitle text-muted">{page.subtitle}</div>
              </div>

              <div className="d-flex flex-column ml-auto border-left pl-4">
                <button data-toggle="modal" data-target={"#edit" + page._id} className="btn btn-primary">
                  <i className="fas fa-pen"></i>
                </button>
                <button data-toggle="modal" data-target={"#delete" + page._id} className="btn btn-danger mt-2">
                  <i className="fas fa-trash"></i>
                </button>
              </div>

            </div>

            <div className="modal fade" id={"delete" + page._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-center" id="exampleModalLabel">Warning!</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Are you sure, do you want to delete page: {page.title}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <a type="button" href={'/api/page/delete/' + page._id} className="btn btn-danger">Delete</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id={'edit' + page._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <form className="mt-4" action={"/api/page/edit/" + page._id} method="POST" encType="multipart/form-data">
                  <div className="modal-header">
                    <h5 className="modal-title text-center" id="exampleModalLabel">Edit {page.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">

                     <div className="form-group">
                        <label>Title</label>
                        <input className="form-control" type="text" name="title" placeholder="Title" defaultValue={page.title} />
                     </div>

                     {page.subtitle ?
                     <div className="form-group">
                        <label>Subtitle</label>
                        <input className="form-control" type="text" name="subtitle" placeholder="Subtitle" defaultValue={page.subtitle} />
                     </div> : null
                     }
                     <div className="form-group">
                        <label>Content</label>
                        <textarea className="form-control mb-3" name="content" placeholder="Content ..." cols="30" rows="10" defaultValue={page.content}></textarea>
                        <img src={page.image} className="rounded d-block m-auto" width="200" alt="" />
                      </div>

                      {page.image ?

                        <div className="input-group">
                          <div className="input-group-prepend">
                           <span className="input-group-text">Upload</span>
                          </div>
                          <div className="form-group custom-file">
                            <input className="custom-file-input" type="file" id="customFile" name="image" />
                            <label className="custom-file-label" htmlFor="customFile">Choose image</label>
                          </div>
                        </div> : null
                  }
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

      <div className="modal fade" id="createPage" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
          <form className="mt-4" action="/api/page/store" method="POST" encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">Create New Page</h5>
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
                  <label>Subtitle</label>
                  <input className="form-control" type="text" name="subtitle" placeholder="Subtitle" />
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
               <i className='fas fa-save'></i> Save
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
export default Pages;
