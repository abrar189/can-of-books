import React, { Component } from 'react'
import './UpdateForm.css';


export class UpdateForm extends Component {
    render() {
        return (
            <div className='formdiv'> 

                <form onSubmit={this.props.updateBookFun} className='from'>

                    <input type="text" name='name' defaultValue={this.props.name} className='group'/>
                    <input type="text" name='description' defaultValue={this.props.description} className='group'/>
                    <input type="text" name='status' defaultValue={this.props.status}className='group' />
                    <input type="submit" value="Update"  className='sub'/>
                </form>
            </div>
        )
    }
}

export default UpdateForm