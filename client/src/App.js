import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Admin from './components/admin/Admin';
import Login from './components/Login';
import Post from './components/Post';
import Page from './components/Page';
import Category from './components/Category';

import './scss/app.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/login" component={Login} />
      <Route path="/categories/:category" component={Category} />
      <Route path="/post/:title" component={Post} />
      <Route path="/page/:title" component={Page} />
    </BrowserRouter>
  );
};

export default App;
