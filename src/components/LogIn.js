import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../actions';

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            credentials: {
                name: '',
                password: ''
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

    login = event => {
        event.preventDefault();
        this.props.login(this.state.credentials)
          .then(() => {
            this.props.history.push("./");
          })
          .then(() => window.location.reload())
        }

    render() {
        return (
            <div>
                LOGIN FORM
                <Form onSubmit={this.login}>
                    <FormGroup row>
                        <Label for="name" sm={2}>Username</Label>
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
                    <button><i class="fas fa-paw fa"> Head Home</i></button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggingIn: state.isLoggingIn,
    signUpSuccess: false,
    signUpSuccessMessage: state.signUpSuccessMessage,
});

export default connect(mapStateToProps, { login })(LogIn);