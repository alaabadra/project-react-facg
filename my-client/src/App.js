import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/home';
import AllStudents from './components/allStudents';
import Student from './components/student';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import './app.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='layout'>
          <Header />
          <Switch>
            <Route path='/' component={Home} exact/>
            <Route path="/all-students" component={AllStudents} exact />
            <Route path="/all-students/:username" component={Student} exacts/>
            <Route render={() => (
              <h1>Page Not Found</h1>
            )} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
