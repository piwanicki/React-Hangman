import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

export const HintTooltip = React.forwardRef((props, ref) => {
  return (
    <div {...props} ref={ref}>
      {props.children}
    </div>
  );
});

export const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13
  }
}))(Tooltip);
