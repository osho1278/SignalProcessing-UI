import React from 'react';
import { observer } from 'mobx-react';
import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { auth } from '../store/auth';

export class Login extends React.Component {

    login=()=>{
        console.log(this.state);
        auth.login(this.state);
    }
    updateUsername=(e:any)=>{
        this.setState({username:e.target.value})
    }
    updatePassword=(e:any)=>{
        this.setState({password:e.target.value})
    }
    render() {
        return (
            <Container fluid style={{ backgroundColor: '#1a1110', height: '100vh', color: 'white', paddingTop: 250 }}>
                <Row className="justify-content-md-center">
                    <Col sm={4} >
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" onChange={this.updateUsername} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={this.updatePassword}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <h6>{auth.message}</h6>
                            <Button 
                            onClick={this.login}
                            variant="primary"
                            // type={"submit"}
                            >
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default observer(Login);