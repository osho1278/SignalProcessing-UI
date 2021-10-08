import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomLineChart from './LineChart';
import Button from 'react-bootstrap/Button';
import { graph } from '../../store/graph';
import { observer } from 'mobx-react';
import ScatterPlot from './ScatterPlot';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
interface Props {
    node: any;
}
interface State {
    graphType:string
}

@observer
export default class Graph extends React.Component<Props, State>{

    /**
     *
     */
    constructor(props:Props) {
        super(props);
        this.state={graphType:''}
        
    }
    onRefresh = () => {
        graph.getData(this.props.node)
    }
    onGraphTypeSeelcted = (e: any) => {
        console.log("onGraphTypeSeelcted", e.target.value);
        this.setState({ graphType: e.target.value })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Button variant="primary" size="sm" onClick={this.onRefresh}>
                            Refresh
                        </Button>
                    </Col>
                    <Col>
                        <Form.Select aria-label={`Select graph type `} onChange={this.onGraphTypeSeelcted}>
                        <option value={`Select Chart`}> {`Select Chart`} </option>
                            <option value={`Line`}> {`Line Chart`} </option>
                            <option value={`Scatter`}> {`Scatter Chart`} </option>

                        </Form.Select>
                    </Col>
                </Row>
                <Row>

                    {this.state.graphType && this.state.graphType=="Line" && graph.data != [] && <CustomLineChart data={graph.data} />}
                    {this.state.graphType && this.state.graphType=="Scatter" && graph.data !=[] && <ScatterPlot data={graph.data} /> }
                </Row>
            </div>
        );
    }
}
