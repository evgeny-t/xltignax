import React from "react";
import ReactDOM from "react-dom";

export default class HUD extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.elements = [];

    window.addEventListener("scroll", () => {
      // TODO: debounce
      this.forceUpdate();
    });

    this.mo = new MutationObserver((records, self) => {
      console.log("MutationObserver", records);
      for (let i = 0; i < records.length; ++i) {
        let an = records[i].addedNodes;
        if (an.length) {
          for (let j = 0; j < an.length; ++j) {
            if (an[j].nodeType === Node.ELEMENT_NODE) {
              let all = an[j].querySelectorAll(".__X");
              all.forEach(el => this.elements.push(el));
              console.log("+", all);
            }
          }
        }
      }

      this.forceUpdate();
    });
    this.mo.observe(document.body, { subtree: true, childList: true });
  }
  componentWillMount() {
    // window.addEventListener(
    //   "test",
    //   event => {
    //     // console.log('event', event);
    //     this.elements.push(event.target);
    //     // console.log("--", event.srcElement);
    //     // let bcr = event.srcElement.getBoundingClientRect();
    //     // let { left, top, width, height } = bcr;
    //     // bcr = { left, top, width, height };
    //     // console.log("test::", event, JSON.stringify(bcr));

    //     // setTimeout(() => this.setState({ bcr, e: event.srcElement }), 1000);

    //     var els = [];
    //     for (let i = 0; i < this.elements.length; ++i) {
    //       if (document.contains(this.elements[i])) {
    //         els.push(this.elements[i]);
    //       }
    //     }
    //     this.elements = els;
    //     this.forceUpdate();
    //   },
    //   true
    // );
  }
  componentDidMount() {
    this.ctx = this.el.getContext("2d");
    // this.forceUpdate();
  }
  componentDidUpdate() {
    this.ctx.clearRect(0, 0, 100000, 100000);

    for (let i = 0; i < this.elements.length; ++i) {
      let box = this.elements[i].getBoundingClientRect();
      let { left, top, width, height } = box;
      this.ctx.strokeStyle = "yellow";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(left, top, width, height);
    }
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
          pointerEvents: "none"
        }}
      />
    );
  }
}
