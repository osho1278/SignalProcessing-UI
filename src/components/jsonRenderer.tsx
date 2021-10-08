import React from 'react';

import Form from 'react-bootstrap/Form';
const jsonObject = { "key": { "timestamp": 1626004575, "fs": "25600", "raw_data": [-0.23], "axis": "x", "device": "123456", "org_id": "1" } }

interface Props {
}
interface State {
    jsonInput: any;
}

export class JsonRenderer extends React.Component<Props, State> {
    /**
     *
     */
    constructor(props: Props) {
        super(props);
        this.state = { jsonInput: '' };
    }

    onJsonInput = (obj: any) => {
        console.log("Called")
        try {
            let inp = JSON.parse(obj.target.value);
            // JSON.stringify(obj.target.value, undefined, 4)
            this.setState({ jsonInput: JSON.stringify(inp, undefined, 4) });

        } catch (e) {
            console.error(e);
        }
    }
    render() {


        return (
            <div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" 
                    rows={20} 
                    onChange={this.onJsonInput} 
                    value=    {this.state && this.state.jsonInput}
                    >
                    
                    </Form.Control>
                </Form.Group>

            </div>




        )
    }

}