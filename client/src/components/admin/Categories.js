import React, { Component } from 'react';
import axios from 'axios';

class Categories extends Component {

constructor(props) {
  super(props);

  this.state = {
    categories: []
 }
}

 componentDidMount() {
   axios.get(`/api/category/list`)
     .then(res => {
       const categories = res.data;

       this.setState({categories});

     })
     .catch(() => {
       this.props.history.push('/login')
     });
 }

 render() {

   return (
    <div className="">

     <h2 className="text-center">Categories</h2>

     <button className="btn btn-light mt-4" data-toggle="modal" data-target="#createCategory">
      <i className="fas fa-plus"></i> New Category
     </button>

       <ul className="mt-4 p-0">
         { this.state.categories.map(category =>
          <li className="card mt-2 p-3" key={category._id}>
           <div className="card-body row pt-0 pb-0">
              <div className="card-title font-weight-bold">{category.title}</div>

              <div className="d-flex flex-column ml-auto border-left pl-4">

                <button className="btn btn-primary" data-toggle="modal" data-target={"#edit" + category.title}><i className="fas fa-pen"></i></button>

                <button className="btn btn-danger mt-2" data-toggle="modal" data-target={"#" + category.title}><i className="fas fa-trash"></i></button>


                <div className="modal fade" id={category.title} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLabel">Warning!</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Are you sure, do you want to delete category: {category.title}
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <a type="button" href={'/api/category/delete/' + category._id} className="btn btn-danger">Delete</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal fade" id={'edit' + category.title} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <form className="container jumbotron py-0 my-auto" action={"/api/category/change/" + category._id} method="POST" encType="multipart/form-data">
                        <div className="modal-header text-center">
                          <h5 className="modal-title text-center" id="exampleModalLabel">Edit Category</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="form-group mt-3">
                            <label>Title</label>
                            <input className="form-control" type="text" name="title" placeholder="Title" defaultValue={category.title} />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                          <button className="btn btn-success" type="submit"><i className='fas fa-save'></i> Save</button>
                        </div>
                        </form>
                      </div>
                  </div>
                </div>

              </div>
            </div>
           </li>
           )
         }
       </ul>

       <div className="modal fade" id="createCategory" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered" role="document">
        <form action="/api/categories/store" method="POST" encType="multipart/form-data">
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title text-center" id="exampleModalLabel">Create category</h5>
               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div className="modal-body">
               <div className="jumbotron">
                 <label>Category title</label>
                 <input className="form-control" type="text" name="title" placeholder="Title" />
               </div>
             </div>
             <div className="modal-footer">
               <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
               <button className="btn btn-success" type="submit">
                <i className='fas fa-save'></i> Save
               </button>
             </div>
           </div>
            </form>
         </div>
       </div>

     </div>
   )
 }
}
export default Categories;
