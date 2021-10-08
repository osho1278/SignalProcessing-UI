import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Props {
  data: any;
}
interface State {
  dataKey: string[];
}
export default class CustomLineChart extends React.Component<Props, State>{
  props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = { dataKey: [] }
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
    console.log("Custom line chart", this.props.data);
    let keys:any = this.props.data && this.props.data.keys || [];
    let output:any = this.props.data && this.props.data.output || [];
    return (
      <div>
        <Form>
          <Row>
            {keys && keys.map((type: any) => (
              <Col>
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type={'checkbox'}
                    id={`default-${type}`}
                    label={`${type}`}
                    name={`${type}`}
                    onChange={this.onChangeFavorite}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Form>
        <ResponsiveContainer width="100%" height="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={output}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {this.state.dataKey.map((dk:string,idx:number)=>
            <Line type="monotone" key={idx} dataKey={dk} stroke="#8884d8" />
            )}
            
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
