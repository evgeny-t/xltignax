import React from "react";
import ReactDOM from "react-dom";

export default class HUD extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = { bcr: {} };
  }
  componentWillMount() {
    window.addEventListener(
      "test",
      event => {
        let bcr = event.srcElement.getBoundingClientRect();
        let { left, top, width, height } = bcr;
        bcr = { left, top, width, height };
        console.log("test::", event, JSON.stringify(bcr));

        setTimeout(() => this.setState({ bcr }), 1000);
      },
      true
    );
  }
  componentDidMount() {
    this.ctx = this.el.getContext("2d");
  }
  componentDidUpdate() {
    const { left, top, width, height } = this.state.bcr;
    this.ctx.strokeStyle = "green";
    this.ctx.strokeRect(left, top, width, height);
  }
  render() {
    return (
      <canvas
        id="__HUD"
        ref={el => (this.el = el)}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          // width: "100px",
          // height: "100px",
          pointerEvents: "none"
        }}
      />
    );
  }
}
