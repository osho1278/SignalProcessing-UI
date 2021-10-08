import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
// import "prismjs/components/prism-clike";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { Card, Container } from "react-bootstrap";
import { Button, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { codeEditor } from '../store/codeEditor';
import { RenderInputs } from "../components/inputs";
import { observer } from "mobx-react";
import Graph from "../components/Charts/Graph";
interface Props {
    inputParams?: any;
    onFileNameChange?: any;
}
interface State {
    code: string;
    fileName?: string;
    params?: any;
    showGraph:boolean
    optionalParams: any[];
}
@observer
export class CodeEditor extends React.Component<Props, State> {
    /**
     *
     */
    optionalVariable: string = '';

    constructor(props: Props) {
        super(props);
        this.state = { code: codeEditor.code, optionalParams: [], params: {},showGraph:false }
    }

    showGraphs=()=>{
        this.setState({showGraph:!this.state.showGraph});
    }
    componentDidMount() {
        console.log("componentDidMount");
        this.setState({ code: codeEditor.code });
    }

    changeHandler = (event: any) => {
        let file = event.target.files[0]
        if (file) {
            this.setState({ fileName: file.name })
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = (evt: any) => {
                let code = evt.target.result;
                this.setState({ code })
            }
            reader.onerror = (evt: any) => {
                console.log("error reading file");
            }
        } else {
            console.log("error reading file not found");
        }
    }
    changeFileName = (event: any) => {
        console.log(event.target.value)
        this.setState({ fileName: event.target.value })
        this.props.onFileNameChange(event.target.value)
    }

    changeOptionalVariableName = (event: any) => {
        console.log(event.target.value)
        this.optionalVariable = event.target.value;
    }

    saveCode = async () => {
        if (this.state.code == '' || this.state.code == undefined || this.state.code == "##Copy paste your code ") {
            alert('Code cannot be null');
            return;
        }

        let { params } = this.state;
        params["output"] = this.state.fileName;
        params["inherited"] = this.props.inputParams && this.props.inputParams.output && Object.keys(this.props.inputParams.output);


        return await codeEditor.saveCode(this.state.code, this.state.fileName, { "args": params, "operation": "save" })

    }
    addOptionalInput = () => {
        console.log("adding : ", this.optionalVariable)
        if (this.optionalVariable != '') {
            let prevVals: string[] = this.state.optionalParams
            prevVals.push(this.optionalVariable)
            this.setState({ optionalParams: prevVals });
            console.log(this.state.optionalParams)
        } else {
            alert("Variable name cannot be null");
        }
    }

    updateOptionalParam = (key: any, val: any) => {
        console.log("update Optional", key, val)
        this.setState({ params: { ...this.state.params, [key]: { "value": val } } });
        //this.setState({params})
        console.log(this.state.params);
    }

    executeCode = async () => {
        if (this.state.fileName == '' || this.state.fileName == undefined) {
            alert('Filename cannot be null');
            return;
        }

        let isCodeSaved: boolean = await this.saveCode() || false;
        if (isCodeSaved) {
            let { params } = this.state;
            params["output"] = this.state.fileName;
            params["inherited"] = this.props.inputParams && this.props.inputParams.output && Object.keys(this.props.inputParams.output);
            let args: string = `-o ${this.state.fileName} --fs 25600 `;

            // Object.keys(params).forEach((element: any) => {

            //     let value: any = params[element].value;

            //     console.log("element =>>>>>>>>>", element)
            //     if (value) {

            //         args += `--${element} \"${value}\" `
            //     }
            // });
            let payload = {
                cmdName: "" + this.state.fileName + ".py",
                args: JSON.stringify(params)
            }
            codeEditor.executeCode(payload)
        }

    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <div style={{}}>
                            {/* <div style={{width:'200'}}> */}
                            <Editor
                                value={codeEditor.code}
                                onValueChange={(code) => {
                                    codeEditor.tempSaveCode(code);
                                    this.setState({ code })
                                }
                                }
                                highlight={(code) => highlight(code, languages.javascript, 'python')}
                                padding={10}
                                // rows={"25"}
                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 18,
                                    border: '1px solid black',
                                    height: '100%',
                                    width: '100%',
                                    overflowY: 'scroll',
                                    overflowX: 'scroll'
                                    // overflow-y: 'scroll'
                                }}
                            />
                        </div>
                    </Col>
                    <Col sm={6}>

                        <InputGroup>
                            {/* <input type="file" name="file" onChange={this.changeHandler} /> */}
                            <InputGroup.Text
                                id="basic-addon1">File Name</InputGroup.Text>
                            <FormControl
                                type={'text'}
                                value={this.state.fileName || ''}
                                placeholder={"Unique name"}
                                onChange={this.changeFileName} />

                        </InputGroup>

                        <InputGroup>
                            {/* <input type="file" name="file" onChange={this.changeHandler} /> */}
                            <InputGroup.Text
                                id="basic-addon1">Upload</InputGroup.Text>
                            <FormControl
                                type={'file'}
                                placeholder={"Unique name"}
                                onChange={this.changeHandler} />
                            {/* <FormControl
                                type={'text'}
                                placeholder={"Unique name"}
                                onChange={this.changeFileName}/> */}
                        </InputGroup>
                        <hr />

                        <InputGroup>
                            {/* <div> */}
                            <FormControl
                                type={'text'}
                                placeholder={"Unique variable Name"}
                                onChange={this.changeOptionalVariableName} />

                            <Button
                                onClick={this.addOptionalInput}
                            >
                                {`Add Optional Input`}
                            </Button>

                        </InputGroup>

                        <InputGroup>
                            {
                                this.state.optionalParams && this.state.optionalParams.map((item: string, index: number) =>
                                    <RenderInputs
                                        id={`${item}-${index}`}
                                        data={this.props.inputParams}
                                        variableName={`${item}`}
                                        defaultValue={''}
                                        onChange={this.updateOptionalParam} />
                                )
                            }

                            {/* </div> */}
                        </InputGroup>

                        {/* </Col> */}
                        {/* </Row> */}
                        {/* <Row> */}
                        {/* <Col sm={6}> */}
                        <hr />
                        <Button
                            onClick={this.saveCode}
                            variant="success" size="lg">
                            Save
                        </Button>{' '}
                        {/* </Col>
                        <Col> */}
                        <Button variant="primary" size="lg">
                            Reset
                        </Button>{' '}
                        <Button
                            onClick={this.executeCode}
                            variant="primary" size="lg">
                            Execute
                        </Button>{' '}

                        <hr />
                        <Card>
                            <Card.Header>Ouput</Card.Header>
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Text>
                                    <pre>
                                        {`${codeEditor.successOutput && codeEditor.successOutput.output || '<output will appear here>'}`}
                                    </pre>
                                </Card.Text>
                                <Button variant="warning" onClick={this.showGraphs}>
                                    Visualize
                                </Button>
                                {this.state.fileName!='' && this.state.showGraph == true && <Graph
                                    node={this.state.fileName}
                                />}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* </Col> */}
            </Container>

        );
    }
}