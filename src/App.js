import React from 'react';
import Header from './Header';
// import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import BestBooks from './BestBooks';
import Login from './Login';
import Profile from './component/Profile';
import BookFormModal from './component/BookFormModal';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    showModal: false,
    

    }
}



  render() {
    const { isAuthenticated } = this.props.auth0;
    // console.log( this.props.auth0)

    console.log('app', this.props);
    return(
      <>
     
   
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {isAuthenticated == true?  <BestBooks  show={this.showModelFun} />: <Login />}
                   {/* {/* {isAuthenticated && */}
                  
                
                { !isAuthenticated && <Login />} 
              </Route >
              <Route exact path="/profile">
                <Profile />
                </Route>

              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
        
      </>
    );
  }
}

export default withAuth0(App);