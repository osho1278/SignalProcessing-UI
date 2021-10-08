import React from 'react';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { items } from '../store/items';
import { widgets } from '../store/widgets';
import { observer } from 'mobx-react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
interface Props {
}
interface State {
    MENU_ID: number;
    show_pop_over: number;

}
class Widgets extends React.Component<Props, State> {

    props: Props;
    contextMenu: any;
    constructor(props: any) {
        super(props);
        this.props = props;
        this.state = { MENU_ID: -1, show_pop_over: -1 }
        this.contextMenu = React.createRef();
    }
    componentDidMount() {
        widgets.getWidgetsFromServer();
    }
    handleClick = (data: any) => {
        items.addItems(data);
    }
    togglePopover = (idx: number) => {
        this.setState({ show_pop_over: idx })
    }

    render() {
        return (
            <Container>
                <div>
                    <Accordion defaultActiveKey="0">
                        {Object.keys(widgets.rules).map((key: any, index: number) => {
                            return (

                                <Accordion.Item
                                    key={`accordion-item${key}${index}`}
                                    eventKey={`item-${index}`}>
                                    <Accordion.Header
                                        key={key}>{key}.
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            widgets.rules[key].map((funcDef: any, idx: number) =>

                                                <div
                                                    key={`div${funcDef.label}${idx}`}
                                                >
                                                    <OverlayTrigger
                                                        key={`overlay-trigger${index}`}
                                                        trigger={['hover', 'focus']} placement={'right'}
                                                        overlay={
                                                            <Popover id="popover-basic"
                                                                show={this.state.show_pop_over != -1 ? true : false}
                                                            >
                                                                <Popover.Header as="h3">Popover right</Popover.Header>
                                                                <Popover.Body>
                                                                    And here's some <strong>amazing</strong> content. It's very engaging.
                                                                    right?
                                                                    <br />
                                                                    {/* <Button variant="success" size="sm" onClick={() => this.handleClick(funcDef)}>Add</Button> */}

                                                                </Popover.Body>
                                                            </Popover>}>
                                                        <span >

                                                            <Card key={idx}>
                                                                <Card.Body
                                                                    onMouseEnter={() => {
                                                                        this.togglePopover(idx);
                                                                        console.log("mouse hover")
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        this.togglePopover(-1);
                                                                        console.log("mouse hover")
                                                                    }}
                                                                >

                                                                    {this.state.show_pop_over == idx ?
                                                                        <Button variant="success" size="sm" onClick={() => this.handleClick(funcDef)}>Add</Button>

                                                                        :
                                                                        <span> {funcDef.label}
                                                                        </span>
                                                                    }
                                                                </Card.Body>
                                                            </Card>
                                                        </span>
                                                    </OverlayTrigger>
                                                </div>
                                            )
                                        }

                                    </Accordion.Body>
                                </Accordion.Item>)
                        }
                        )}

                    </Accordion>
                </div>
            </Container>
        );
    }
}

export default observer(Widgets);
