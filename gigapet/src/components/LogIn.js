import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../actions';

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            credentials: {
                username: '',
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
            this.props.history.push("./main");
            window.location.reload();
          })
        }

    render() {
        return (
            <div>
                LOGIN FORM
                <div> {this.props.signUpSuccess ? (
                    `${this.props.signUpSuccessMessage}`
                ) : (
                        ''
                    )}
                </div>
                <Form onSubmit={this.login}>
                    <FormGroup row>
                        <Label for="username" sm={2}>Username</Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="username"
                                placeholder="johndoe123"
                                value={this.state.credentials.username}
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