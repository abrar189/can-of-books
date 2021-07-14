import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';


export class bookForm extends Component {
    render() {
        return (
            <div>
                <Form onSubmit={this.props.addBook}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Book Name" name='bookName' />
                        <Form.Control type="text" placeholder="Description" name='description' />
                        <Form.Control type="text" placeholder="Status" name='status' />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default bookForm;