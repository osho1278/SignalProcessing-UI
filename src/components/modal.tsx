import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { items } from '../store/items';
import { cmd } from '../store/command';

import { observer } from 'mobx-react';
import { RenderInputs } from './inputs';
import { CodeEditor } from '../screens/CodeEditor';
import Example from './Charts/LineChart';
import Graph from './Charts/Graph';
import { FileUpload } from './fileUpload';


interface Props {
    show: boolean;
    handleClose: Function;
    data: any;
}
interface State {
    stageOutput?: string;
    params?: any;
    showGraph: boolean;
}
@observer
export class CustomModal extends React.Component<Props, State> {
    props: Props;
    constructor(props: Props) {
        super(props);
        this.props = props;
        this.state = { params: {}, showGraph: false }
        this.getMetaData();
    }
    componentDidMount() {
        console.log("CustomModal mounted", this.props.data)
        this.getMetaData();
    }

    getConnectedNodes=()=>{
        let inherited:string='';
        console.log("Connected Param is is = ",this.props.data.id);
        items.getIncomers(this.props.data).forEach((item:any)=>{
            inherited+=item.data.label+","
        })
        console.log("inherited nodes are",inherited);
        return inherited;
    }

    getMetaData = () => {
        let { data } = this.props.data;
        if (data && data.label) {
            cmd.getCommandOutput(data.label);
            cmd.getCommandInputParams(this.props.data);
        }
    }

    handleClose = () => {
        this.props.handleClose();
    }

    handleDelete = () => {
        console.log(this.props.data);
        items.removeItems(this.props.data);
        this.props.handleClose();
    }

    executeCode = () => {
        console.log("Executing", this.state)
        cmd.execute(this.props.data, this.state.params);
    }

    showGraphs = () => {
        console.log("Showing")
        this.setState({ showGraph: !this.state.showGraph })
    }

    updateOptionalParam = (key: any, val: any) => {
        console.log("update Optional", key, val)
        this.setState({ params: { ...this.state.params, [key]: { "value": val } } });
        //this.setState({params})
        console.log(this.state.params);
    }

    render() {
        let { data, id } = this.props.data;
        console.log(data)
        return (
            <Modal scrollable={true} fullscreen={true} show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{data && data.label}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div style={{ padding: 20 }}>
                        {
                            data && data.function_type == "Custom" &&

                            <div>
                                <CodeEditor
                                    inputParams={cmd.stageInput}
                                    onFileNameChange={(label: string) => {
                                        console.log("node id is ", id, " and label is ", label)
                                        // items.updateLabel(id,label)
                                    }}
                                />
                            </div>
                        }
                        {
                            data && data.function_type == "Input" &&

                            <div>
                                <FileUpload/>
                            </div>
                        }
                        {
                            data && data.function_type == "Graph" && <Graph
                            node={this.getConnectedNodes()}
                        />
                        }
                        {
                            data && (data.function_type == "PreBuiltFunctions" || data.function_type == "Input") &&
                            <div>
                                <Card>
                                    <Card.Header>Current Stage Output :</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                                                {cmd.stageOutput[this.props.data.data && this.props.data.data.label] && cmd.stageOutput[this.props.data.data && this.props.data.data.label].output || '<Refresh to see output>'}
                                            </pre>
                                        </Card.Text>
                                        <Button variant="warning" onClick={this.showGraphs}>
                                            Visualize
                                        </Button>
                                        {this.state.showGraph == true && <Graph
                                            node={this.props.data.data.label}
                                        />}
                                    </Card.Body>
                                </Card>

                                {data && data.data && data.data.parameters && Object.keys(data.data.parameters).map((key: any, id: number) => {
                                    console.log("key is ", data.data.parameters[key]["value"])
                                    // this.updateOptionalParam(key,data.data.parameters[0][key]["value"])
                                    if (key == "inherited" || key == "output") {

                                    } else {
                                        return <RenderInputs
                                            id={`${key}-${id}`}
                                            variableName={key}
                                            data={cmd.stageInput}
                                            defaultValue={data.data.parameters[key]["value"].toString()}
                                            onChange={this.updateOptionalParam}
                                        />
                                    }
                                }
                                )
                                }
                            </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={this.getMetaData}>
                        Refresh
                    </Button>
                    <Button variant="secondary" onClick={this.executeCode}>
                        Execute Code
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button>
                    <Button variant="danger" onClick={this.handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};