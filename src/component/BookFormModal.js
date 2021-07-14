import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import BookForm from './BookForm';

export class BookFormModal extends Component {

    

    render() {
        return (
            <div>

                <Modal show={this.props.show} onHide={this.props.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BookForm  addBook={this.props.addBook} />
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.hide} >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* <BestBooks show={this.state.showModalFun}/> */}
            </div>
        )
    }
}

export default BookFormModal;