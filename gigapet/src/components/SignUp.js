import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { signUp } from '../actions';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            credentials: {
                name: '',
                password: '',
                email: ''
            }
        }
    }

    handleChanges = event => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [event.target.name]: event.target.value
            }
        })

        // console.log(this.state.credentials)
    }

    signUp = event => {
        event.preventDefault();
        this.props.signUp(this.state.credentials)
          .then(() => {
            this.props.history.push("./");
            window.location.reload()
          })
    }


   
    render() {
        return (
            <div>
                SIGN UP FORM
                <Form onSubmit={this.signUp}>
                    <FormGroup row>
                        <Label for="Username" sm={2}>Username</Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="name"
                                placeholder="johndoe123"
                                value={this.state.credentials.name}
                                onChange={this.handleChanges} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="Password" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input
                                type="password"
                                name="password"
                                placeholder="...password"
                                value={this.state.credentials.password}
                                onChange={this.handleChanges} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="Email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input
                                type="email"
                                name="email"
                                placeholder="johndoe@gmail.com"
                                value={this.state.credentials.email}
                                onChange={this.handleChanges} />
                        </Col>
                    </FormGroup>
                    <button type="submit"> <i class="fas fa-paw fa"> Adopt A Friend</i></button>
                </Form>
                {/* <div> {this.props.error ? (`${this.props.errorMessage}`) : ('')}</div> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.error,
    errorMessage: state.errorMessage
});

export default connect(mapStateToProps, { signUp })(SignUp);