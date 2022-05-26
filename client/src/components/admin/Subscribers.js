import React, { Component } from 'react';
import axios from 'axios';

class Subscribers extends Component {

constructor(props) {
  super(props);

  this.state = {
    subscribers: []
 }
}

 componentDidMount() {
   axios.get(`/api/subscribers/get`)
     .then(res => {
       const subscribers = res.data.subscribers;
       this.setState({ subscribers });
     })
     .catch(() => {
       this.props.history.push('/login')
     });
 }

 render() {

   return (

     <div className="w-100">

      <h2 className="text-center">Subscribers</h2>

      <ul className="list-group text-center mt-3">
      {this.state.subscribers.map(subsc =>
        <li key={subsc._id} className="list-group-item">{subsc.email}</li>
      )}
      </ul>
      </div>

   )
 }
}
export default Subscribers;
