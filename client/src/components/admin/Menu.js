import React, { Component } from 'react';
import axios from 'axios';

class Menu extends Component {

constructor(props) {
  super(props);

  this.state = {
    menu: []
 }
}

 componentDidMount() {
   axios.get(`/api/menu`)
     .then(res => {
       const menu = res.data;
       this.setState({ menu });
     })
     .catch(() => {
       this.props.history.push('/login')
     });
 }

 render() {

   return (

     <div className="w-100">

      <h2 className="text-center">Menu information</h2>

{ this.state.menu.map(menus =>
      <form className="mt-4" action={"/api/menu/edit/" + menus._id} key={menus._id} method="POST" encType="multipart/form-data">
        <div className="modal-header">
          <img className="rounded-circle" width="75" height="75" src={menus.image} alt="" />
          <h5 className="modal-title text-center" id="exampleModalLabel">Edit menu information</h5>
        </div>
        <div className="modal-body">

           <div className="form-group">
              <label>Title</label>
              <input className="form-control" type="text" name="title" defaultValue={menus.title} placeholder="Title" />
           </div>

           <div className="form-group">
               <label>
                 Email
               </label>
               <input className="form-control" type="email" name="email" defaultValue={menus.email} placeholder="Email" />
           </div>

           <div className="form-group">
               <label>
                 Sidebar description
               </label>
               <input className="form-control" type="sidebar" name="sidebar" defaultValue={menus.sidebar} placeholder="Email" />
           </div>

           <div className="form-group">
              <label>Facebook</label>
              <input className="form-control" type="url" name="facebook" defaultValue={menus.socials.facebook} placeholder="Facebook URL" />
            </div>

           <div className="form-group">
              <label>Instagram</label>
              <input className="form-control" type="url" name="instagram" defaultValue={menus.socials.instagram} placeholder="Instagram URL" />
            </div>

           <div className="form-group">
              <label>About</label>
              <textarea className="form-control" name="about" defaultValue={menus.about} placeholder="Content ..." cols="30" rows="10"></textarea>
            </div>

            <div className="input-group">
              <div class="input-group-prepend">
               <span class="input-group-text">Upload</span>
              </div>

              <div className="form-group custom-file">
                <input className="custom-file-input" type="file" id="customFile" name="image" />
                <label className="custom-file-label" htmlFor="customFile">Choose image</label>
              </div>
            </div>

        </div>
        <div className="modal-footer">
          <button className="btn btn-success" type="submit">
           <i className='fas fa-save'></i> Post
          </button>
        </div>
        </form>
)}
      </div>
   )
 }
}
export default Menu;
