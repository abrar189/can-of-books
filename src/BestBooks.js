import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Jumbotron, Button } from 'react-bootstrap';
import './BestBooks.css';
import axios from 'axios';
import BookForm from './component/BookForm';
import BookFormModal from './component/BookFormModal';
import { withAuth0 } from "@auth0/auth0-react";


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      showModal: false,

    }

  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    //http://localhost:3001/books?userEmail=algourabrar@gmail.com
    let url = `http://localhost:3001/books?userEmail=${user.email}`
    let resData = await axios.get(url);

    await this.setState({
      userData: resData.data
    })
    console.log(this.state.userData)
  }

  addBook = async (event) => {
    event.preventDefault();

    const bookData = {
      name: event.target.bookName.value,
      description: event.target.description.value,
      status: event.target.status.value,
      userEmail: this.props.auth0.user.email
    }
console.log('addddgddddddddddd', bookData);
    let resData = await axios.post('http://localhost:3001/addBooks', bookData)

    this.setState({
      userData: resData.data
    })

  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteBook = async (index) => {
    const { user } = this.props.auth0;
    console.log(index);

    let paramsObj = {
      userEmail: user.email
    }
    let resData = await axios.delete(`http://localhost:3001/deleteBooks/${index}`, { params: paramsObj })

    this.setState({
      userData: resData.data
    })

  }

  showModelFun = () => {
    this.setState({
      showModal: true,
    })

  }

  hideModelFun = () => {
    this.setState({
      showModal: false,
    })

  }
  render() {
   
    return (
      <>
        {this.state.userData == null ? '' :
          <Button variant="primary" onClick={this.showModelFun}>
            ADD Book
          </Button>}

        {this.state.userData == null ?
          <Jumbotron>
            <h1>My Favorite Books</h1>
            <p>
              This is a collection of my favorite books
            </p>
          </Jumbotron>
          :

          this.state.userData.map((item, index) => {
            return (


              <Card key={index}>
                <Card.Body>Name :{item.name}</Card.Body>
                <Card.Body>Description :{item.description}</Card.Body>
                <Card.Body>Status : {item.status}</Card.Body>
                <Button variant="primary" onClick={() => this.deleteBook(index)}>
                  Delete
                </Button>
              </Card>



            )
          })

        }
        <BookFormModal show={this.state.showModal}  hide={this.hideModelFun} addBook={this.addBook} />

      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);