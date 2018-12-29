import React from "react";
import AnimateHeight from "react-animate-height";

export default class CollapsingList extends React.Component {
  state = {
    height: 0,
    childrenCounter: 0
  };

  static getDerivedStateFromProps = (props, state) =>
    props.children.length !== state.childrenCounter
      ? {
          height: "auto",
          childrenCounter: props.children.length
        }
      : null;

  componentDidUpdate = () => {
    if (this.state.height === "auto") {
      const height = document.getElementById("dynamicContentWrapper")
        .clientHeight;
      this.setState({ height });
    }
  };

  render() {
    return (
      <AnimateHeight height={this.state.height}>
        <div id="dynamicContentWrapper">{this.props.children}</div>
      </AnimateHeight>
    );
  }
}
