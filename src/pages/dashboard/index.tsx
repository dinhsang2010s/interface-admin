import React, { useState } from "react";
import { Carousel, Col, Row, Tabs } from "antd";
import "./style.less";

const items = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

export const Dashboard = () => {
  return (
    <Row>
      <Col className="info" flex={3}>
        <Carousel>
          <div className="theme">
            <div className="item-theme">item1</div>
            <div className="item-theme">item2</div>
            <div className="item-theme">item1</div>
            <div className="item-theme">item2</div>
          </div>
          <div className="theme">
            <div className="item-theme">item1</div>
            <div className="item-theme">item2</div>
          </div>
          <div className="theme">
            <div className="item-theme">item1</div>
            <div className="item-theme">item2</div>
          </div>
        </Carousel>
        <div className="todo">asdas</div>
      </Col>
      <Col className="schedule" flex={2}>
        2 / 5
      </Col>
    </Row>
  );
};
