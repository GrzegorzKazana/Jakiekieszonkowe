// import React, { Component } from "react";
// import { Drawer, Paper } from "@material-ui/core";

// export default class MapDrawer extends React.Component {
//   state = {
//     drawerOpen: true
//   };
//   render() {
//     const { style } = this.props;
//     return (
//       <Drawer
//         open={this.state.drawerOpen}
//         onClose={() => this.setState({ drawerOpen: false })}
//       >
//         <div style={{ width: "400px" }}>asdsdfgfg</div>
//       </Drawer>
//       //   <Paper style={{ ...style }} open={true} variant="permanent">
//       //     <div style={{ width: "256px" }}>asdsdfgfg</div>
//       //   </Paper>
//     );
//   }
// }
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Paper, Slide } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { capitalize } from "@material-ui/core/utils/helpers";
import { duration } from "@material-ui/core/styles/transitions";

const oppositeDirection = {
  left: "right",
  right: "left",
  top: "down",
  bottom: "up"
};

export function isHorizontal(props) {
  return ["left", "right"].indexOf(props.anchor) !== -1;
}

export function getAnchor(props) {
  return props.theme.direction === "rtl" && isHorizontal(props)
    ? oppositeDirection[props.anchor]
    : props.anchor;
}

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    zIndex: theme.zIndex.appBar - 1,
    WebkitOverflowScrolling: "touch", // Add iOS momentum scrolling.
    position: "absolute",
    top: 0
  },
  /* Styles applied to the root element if `variant="permanent or persistent"`. */
  docked: {
    // flex: "0 0 auto"
  },
  /* Styles applied to the `Paper` component. */
  paper: {
    height: "100%",
    overflowY: "auto",
    padding: "8px"
  },
  /* Styles applied to the `Paper` component if `anchor="left"`. */
  paperAnchorLeft: {
    left: 0,
    right: "auto"
  },
  /* Styles applied to the `Paper` component if `anchor="right"`. */
  paperAnchorRight: {
    left: "auto",
    right: 0
  },
  /* Styles applied to the `Paper` component if `anchor="top"`. */
  paperAnchorTop: {
    top: 0,
    left: 0,
    bottom: "auto",
    right: 0,
    height: "auto",
    maxHeight: "100%"
  },
  /* Styles applied to the `Paper` component if `anchor="bottom"`. */
  paperAnchorBottom: {
    top: "auto",
    left: 0,
    bottom: 0,
    right: 0,
    height: "auto",
    maxHeight: "100%"
  },
  /* Styles applied to the `Paper` component if `anchor="left"` & `variant` is not "temporary". */
  paperAnchorDockedLeft: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  /* Styles applied to the `Paper` component if `anchor="top"` & `variant` is not "temporary". */
  paperAnchorDockedTop: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  /* Styles applied to the `Paper` component if `anchor="right"` & `variant` is not "temporary". */
  paperAnchorDockedRight: {
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  /* Styles applied to the `Paper` component if `anchor="bottom"` & `variant` is not "temporary". */
  paperAnchorDockedBottom: {
    borderTop: `1px solid ${theme.palette.divider}`
  },
  /* Styles applied to the `Modal` component. */
  modal: {}
});

/**
 * The properties of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
class Drawer extends React.Component {
  // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.
  mounted = false;

  componentDidMount() {
    this.mounted = true;
  }

  render() {
    const {
      anchor: anchorProp,
      BackdropProps,
      children,
      classes,
      className,
      elevation,
      ModalProps: { BackdropProps: BackdropPropsProp, ...ModalProps } = {},
      onClose,
      open,
      PaperProps,
      SlideProps,
      theme,
      transitionDuration,
      variant,
      ...other
    } = this.props;

    const anchor = getAnchor(this.props);
    const drawer = (
      <Paper
        elevation={2}
        square
        className={classNames(
          classes.paper,
          classes[`paperAnchor${capitalize(anchor)}`],
          {
            [classes[`paperAnchorDocked${capitalize(anchor)}`]]:
              variant !== "temporary"
          }
        )}
        {...PaperProps}
      >
        {children}
      </Paper>
    );

    const slidingDrawer = (
      <Slide
        in={open}
        direction={oppositeDirection[anchor]}
        timeout={transitionDuration}
        appear={this.mounted}
        {...SlideProps}
      >
        {drawer}
      </Slide>
    );

    return (
      <div
        className={classNames(classes.root, classes.docked, className)}
        {...other}
      >
        {slidingDrawer}
      </div>
    );
  }
}

Drawer.propTypes = {
  /**
   * Side from which the drawer will appear.
   */
  anchor: PropTypes.oneOf(["left", "top", "right", "bottom"]),
  /**
   * The contents of the drawer.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The elevation of the drawer.
   */
  elevation: PropTypes.number,
  /**
   * Properties applied to the [`Modal`](/api/modal/) element.
   */
  ModalProps: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the drawer is open.
   */
  open: PropTypes.bool,
  /**
   * Properties applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps: PropTypes.object,
  /**
   * Properties applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })
  ]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(["permanent", "persistent", "temporary"])
};

Drawer.defaultProps = {
  anchor: "left",
  elevation: 16,
  open: false,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};

export default withStyles(styles, {
  name: "MuiDrawer",
  flip: false,
  withTheme: true
})(Drawer);
