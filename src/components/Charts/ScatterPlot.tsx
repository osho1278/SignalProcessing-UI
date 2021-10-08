import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Props {
  data: any;
}
interface State {
  dataKey: string[];
  xAxisKey: string
  yAxisKey: string
}

export default class ScatterPlot extends React.Component<Props, State>{
  props: Props;
  /**
   *
   */
  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state={xAxisKey:'',yAxisKey:'',dataKey:[]}
  }
  xAxisSelected = (e: any) => {
    console.log("xAxisSelected", e.target.value);
    this.setState({ xAxisKey: e.target.value })
  }


  yAxisSelected = (e: any) => {
    console.log("yAxisSelected", e.target.value);
    this.setState({ yAxisKey: e.target.value })
  }

  onChangeFavorite = (event: any) => {
    console.log(event.target.checked, event.target.name);
    let keys: string[] = this.state.dataKey;
    if (event.target.checked) {
      keys.push(event.target.name)
    } else {
      const index = keys.indexOf(event.target.name);
      if (index > -1) {
        keys.splice(index, 1);
      }
    }
    this.setState({ dataKey: keys });
    console.log(this.state)
  };

  render() {
    console.log("Custom scatter plot chart", this.props.data);
    let keys: any = this.props.data && this.props.data.keys || [];
    let output: any = this.props.data && this.props.data.output || [];
    return (
      <div>
        <Form>
          <Row>
            <Form.Select aria-label={this.state.xAxisKey || `Select x axis variable `} onChange={this.xAxisSelected}>
              <option
                value={`Select X Axis`}
              >{`Select X Axis`}
              </option>
              {keys && keys.map((item: any) => {

                return <option
                  onClick={this.xAxisSelected}
                  value={item}
                >{item}</option>
              })}
            </Form.Select>

            <Form.Select aria-label={this.state.xAxisKey || `Select Y axis variable `} onChange={this.yAxisSelected}>
              <option
                value={`Select Y Axis`}
              >{`Select Y Axis`}
              </option>
              {keys && keys.map((item: any) => {

                return <option
                  onClick={this.yAxisSelected}
                  value={item}
                >{item}</option>
              })}
            </Form.Select>

          </Row>
        </Form>
        <ResponsiveContainer width="100%" height="100%" aspect={3}>
          <ScatterChart
            width={400}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            {
              this.state.xAxisKey != '' &&
              <XAxis type="number" dataKey={this.state.xAxisKey} name={this.state.xAxisKey} unit="" />
            }
            {
              this.state.yAxisKey != '' &&
              <YAxis type="number" dataKey={this.state.yAxisKey} name={this.state.xAxisKey} unit="" />
            }

            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={output} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
