import React, { Component } from "react";
import LayoutService from "../Layout/service";
import SettingsService from "./service";
import {
  Container,
  Tab,
  Row,
  Col,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import "./style.scss";
export default class Settings extends Component {
  service = SettingsService;
  constructor(props: any) {
    super(props);
    SettingsService.init(this);
  }
  render() {
    return (
      <>
        <div className="settings">
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <div className="view">
              <Row>
                <Col sm={4}>
                  <ListGroup>
                    <ListGroup.Item action href="#link1">
                      Link 1
                    </ListGroup.Item>
                    <ListGroup.Item action href="#link2">
                      Link 2
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col sm={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey="#link1">
                      <Accordion defaultActiveKey={["0"]} alwaysOpen>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Accordion Item #1</Accordion.Header>
                          <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Accordion Item #2</Accordion.Header>
                          <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link2">
                      <p>
                        Cupid laid by his brand and fell asleep: A maid of
                        Dian's this advantage found, And his love-kindling fire
                        did quickly steep In a cold valley-fountain of that
                        ground; Which borrow'd from this holy fire of Love, A
                        dateless lively heat, still to endure, And grew a
                        seeting bath, which yet men prove Against strange
                        maladies a sovereign cure. But at my mistress' eye
                        Love's brand new-fired, The boy for trial needs would
                        touch my breast;
                      </p>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </div>
          </Tab.Container>
        </div>
      </>
    );
  }
}
LayoutService.addLayout("Settings", Settings);
