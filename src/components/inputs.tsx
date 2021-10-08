import React, { useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

import DropdownButton from 'react-bootstrap/DropdownButton';
import { items } from '../store/items';



interface Props {
    id: string;
    data: any;
    variableName: string;
    defaultValue: string;
    onChange: any;
}

export const RenderInputs = (props: Props) => {

    const [stage, setStage] = useState('Select Function');
    const [variables, setVariables] = useState(['Select Variable']);
    const [finalVariableSelected, setVariableSelected] = useState('Select Variable');

    const stageSelected = (e: any) => {
        console.log(e.target.value);
        setStage(e.target.value);
        console.log("hello",);
        setVariables(props.data.output[e.target.value]);
    }

    const variableSelected = (e: any) => {
        setVariableSelected(e.target.value)
        console.log("variableSelected", e.target.value);
        props.onChange(props.variableName, `${stage}|${e.target.value}`)
    }


    return (
        <div style={{ padding: 5 }}>
            <Row>
                <Col>
                    {/* <InputGroup className="sm-1"> */}
                    <InputGroup.Text id="basic-addon1">{props.variableName}</InputGroup.Text>
                    {/* </InputGroup> */}
                    {/* {props.variableName} */}
                </Col>
                <Col>
                    <FormControl
                        id={props.id}
                        type={'text'}
                        placeholder={props.defaultValue && !props.defaultValue.includes("|") ? props.defaultValue : ''}
                        onChange={(e: any) => props.onChange(props.variableName, e.target.value)}
                    />
                </Col>
                <Col>
                    {/* <DropdownButton size="sm" id="dropdown-basic-button" title={stage}>
                        {props.data && props.data.output && Object.keys(props.data.output).map((item: any) => {

                            return <Dropdown.Item
                                onClick={stageSelected}
                                value={item}
                            >{item}</Dropdown.Item>
                        })}
                    </DropdownButton> */}
                    <Form.Select aria-label={stage} onChange={stageSelected}>
                        <option
                            value={props.defaultValue && props.defaultValue.includes("|") ? props.defaultValue.split("|")[0] : 'Select function'}
                        >{props.defaultValue && props.defaultValue.includes("|") ? props.defaultValue.split("|")[0] : 'Select function'}
                        </option>
                        {props.data && props.data.output && Object.keys(props.data.output).map((item: any) => {

                            return <option
                                onClick={stageSelected}
                                value={item}
                            >{item}</option>
                        })}
                    </Form.Select>


                </Col>
                <Col>
                    {/* <DropdownButton size="sm" id="dropdown-basic-button" title={finalVariableSelected}>
                        {variables && variables.map((item: any) => {

                            return <Dropdown.Item
                                onClick={variableSelected}
                                value={item}
                                size="sm"
                            >{item}</Dropdown.Item>
                        })}
                    </DropdownButton> */}

                    <Form.Select aria-label={finalVariableSelected} onChange={variableSelected}>
                        <option
                            value={props.defaultValue && props.defaultValue.includes("|") ? props.defaultValue.split("|")[1] : `Select variable`}
                        >{props.defaultValue && props.defaultValue.includes("|") ? props.defaultValue.split("|")[1] : `Select variable`}
                        </option>
                        {variables && variables.map((item: any) => {

                            return <option
                                onClick={variableSelected}
                                value={item}
                            >{item}</option>
                        })}
                    </Form.Select>
                </Col>
            </Row>
        </div>

        // <Row className="sm-1">
        //     <Form.Group as={Col} controlId="formGridEmail">
        //         <Form.Label>{props.variableName}</Form.Label>
        //         <Form.Control type="text" placeholder={props.defaultValue} onChange={props.onChange} />
        //     </Form.Group>
        // </Row>

    )

}