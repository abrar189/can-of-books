import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Jumbotron, Button } from 'react-bootstrap';
import './BestBooks.css';
import axios from 'axios';
import BookForm from './component/BookForm';
import BookFormModal from './component/BookFormModal';
import { withAuth0 } from "@auth0/auth0-react";
import UpdateForm from './component/UpdateForm';


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      showModal: false,
      server:process.env.REACT_APP_SERVER_URL,
      name:'',
      description:'',
      statues:'',
      index:0,
      showUpdateForm: false,

    }

  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    //http://localhost:3001/books?userEmail=algourabrar@gmail.com
    let url = `${this.state.server}/books?userEmail=${user.email}`
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
    let resData = await axios.post(`${this.state.server}/addBooks`, bookData)

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
    let resData = await axios.delete(`${this.state.server}/deleteBooks/${index}`, { params: paramsObj })

    this.setState({
      userData: resData.data
    })

  }

  showUpdateForm = async (index) => {

    await this.setState({
      showUpdateForm: true,
      index: index,
      name: this.state.userData[index].name,
      description: this.state.userData[index].description,
      status:this.state.userData[index].status,
    })
  }

  updateBookFun = async (event) =>{
    event.preventDefault();

    let bookFormData ={
      name:event.target.name.value,
      description:event.target.description.value,
      status:event.target.status.value,
      userEmail: this.props.auth0.user.email
    }

    let updatedData = await axios.put(`${this.state.server}/updateBook/${this.state.index}`,bookFormData)
    
    this.setState({

      userData:updatedData.data,
      showUpdateForm:false
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


              <Card key={index} className='cardid'>
                <Card.Body>Name :{item.name}</Card.Body>
                <Card.Body>Description :{item.description}</Card.Body>
                <Card.Body>Status : {item.status}</Card.Body>
               <span> <Button variant="primary" onClick={() => this.deleteBook(index)} className='but'>
                  Delete
                </Button></span>
               <span> <Button variant="primary" onClick={() => this.showUpdateForm(index)} className='but'>
                  update
                </Button></span>
              </Card>



            )
          })

        }
        <BookFormModal show={this.state.showModal}  hide={this.hideModelFun} addBook={this.addBook}  />
        {this.state.showUpdateForm&&
        <UpdateForm name={this.state.name} description={this.state.description} status={this.state.status} updateBookFun={this.updateBookFun}/>}
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);