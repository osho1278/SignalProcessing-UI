import React from 'react';
import { items } from '../store/items';
import { observer } from 'mobx-react';
import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Graph from './graph';
import Widgets from './widgets';
import { JsonRenderer } from '../components/jsonRenderer';
import {auth} from '../store/auth'

export class Main extends React.Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={2} style={{ border: '0px solid red' }}>
                        <Widgets />
                    </Col>
                    <Col md={10} style={{ border: '0px solid red' }}>
                        <Graph
                        />
                    </Col>
                    {/* <Col md={3} style={{ border: '0px solid red' }}>
                        <h3>Input</h3>
                       <JsonRenderer/>
                    </Col> */}
                </Row>
            </Container>
        );
    }
};

export default observer(Main);