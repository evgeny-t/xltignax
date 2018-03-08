import React from "react";
import ReactDOM from "react-dom";

export default function interactive(Component) {
  class Interactive extends React.Component {
    componentDidMount() {
      const el = ReactDOM.findDOMNode(this);
      el.classList.add("__X");
    }
    render() {
      return <Component {...this.props} />;
    }
  }
  Interactive.displayName = `Interactive(${Component.displayName})`;
  return Interactive;
}
