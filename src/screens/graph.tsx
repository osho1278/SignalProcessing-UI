import { PropTypes } from 'mobx-react';
import React from 'react';
import { CustomModal } from '../components/modal'
import { items } from '../store/items';
import { observer, inject } from 'mobx-react';
import ReactFlow, { Controls } from 'react-flow-renderer';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import { widgets } from '../store/widgets';


const graphStyles = { width: "100%", height: window.innerHeight };

interface Props {
    nodes?: any[];
}
interface State {
    showModal: boolean;
    data: any;
    graphName: string;
}

class Graph extends React.Component<Props, State> {
    props: Props;
    constructor(props: Props) {
        super(props);
        this.props = props;
        this.state = { showModal: false, data: [], graphName: '' };
    }
    componentDidMount() {
        console.log("Graph has mounted");
        items.getGraph();
    }

    showModal = (event: any, element: any) => {
        // console.log(element.data.label)
        this.setState({ showModal: true, data: element });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    onConnect = (params: any) => {
        console.log("onConnectEnd", params);
        items.addEdge(params);
    }
    onEdgeUpdate = (oldEdge: any, event: any) => {
        console.log("onEdgeUpdate", event);
    }
    onLoad = (reactFlowInstance: any) => reactFlowInstance.fitView();

    onSave = () => {
        items.saveGraph()
    }
    loadGraph = () => {
        items.saveGraph()
    }
    deleteWidget=(id:number)=>{
        items.deleteGraph(id);
        items.getGraph();

    }

    render() {
        console.log("Received", items.nodes);
        return (
            items.nodes.length == 0 ?
                (<div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Graph Name</th>
                                <th>Created By</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.allNodes.map((item: any, index: any) => {

                                return (
                                    <tr id={`table-row-${index}`}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.username}</td>
                                        <td>{item.last_updated}</td>
                                        <td>
                                            <Button variant="warning" onClick={() =>   
                                                items.nodes =JSON.parse(item.graph)
                                            }>
                                                Load
                                            </Button>
                                            <Button variant="danger" onClick={()=>this.deleteWidget(item.id)
                                            }>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>

                                )
                            })}

                        </tbody>
                    </Table>
                </div>) :
                (<div>
                    <FormControl
                        id={"graph name"}
                        type={'text'}
                        placeholder={'Graph name'}
                        value={items.graphName}
                        onChange={(e: any) => items.graphName = e.target.value}
                    />
                    <Button variant="warning" onClick={this.onSave}>
                        Save Graph
                    </Button>
                    <Button variant="warning" onClick={() => items.nodes = []}>
                        Close Graph
                    </Button>
                    {/* <Button variant="secondary" onClick={this.executeCode}>
                    Execute Code
                </Button> */}
                    <ReactFlow
                        onLoad={this.onLoad}
                        elements={items.nodes}
                        style={graphStyles}
                        onConnect={this.onConnect}
                        onEdgeUpdate={this.onEdgeUpdate}
                        onElementClick={this.showModal}
                    />
                    <CustomModal
                        show={this.state.showModal}
                        data={this.state.data}
                        handleClose={this.handleCloseModal}
                    />
                </div>
                )

        )
    }
}
export default observer(Graph);