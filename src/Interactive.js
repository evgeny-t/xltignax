import React from "react";
import ReactDOM from "react-dom";

export default function interactive(Component) {
  class Interactive extends React.Component {
    componentDidMount() {
      const el = ReactDOM.findDOMNode(this);
      el.dataset.test = "098098";
      el.dispatchEvent(new Event("test", el.getBoundingClientRect()));
      console.log(el);
    }
    render() {
      return <Component {...this.props} />;
    }
  }
  Interactive.displayName = `Interactive(${Component.displayName})`;
  return Interactive;
}
