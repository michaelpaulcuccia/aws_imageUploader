import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Uploader from './components/Uploader';

const App = () => {
  return (
    <Router>
      <Route path='/' component={Home} exact />
      <Route path='/uploader' component={Uploader} exact />
    </Router>
  )
}

export default App
