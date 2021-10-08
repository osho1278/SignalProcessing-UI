import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { toast } from '../store/toast';
import { observer } from 'mobx-react';

interface State {
    show: boolean;
}

interface Props {

}


@observer
export class ToastComponent extends React.Component<Props, State> {

    /**
     *
     */
    constructor(props: Props) {
        super(props);
        this.state = { show: true }
    }

    render() {
        return (
            <Row>
                <Col xs={6}>
                    <ToastContainer className="p-3" position="bottom-end">
                        <Toast
                            bg="primary"
                            onClose={() => toast.show = false}
                            show={toast.show}
                            delay={5000}
                            autohide>
                            <Toast.Header>
                                <small>{toast.header}</small>
                            </Toast.Header>
                            <Toast.Body className={'dark'}>
                                {toast.message}
                            </Toast.Body>
                        </Toast>

                    </ToastContainer>
                </Col>

            </Row>
        )
    }
}