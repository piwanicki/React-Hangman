import Tooltip from '@material-ui/core/Tooltip';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import React from 'react';

export const HintTooltip = React.forwardRef((props,ref) => {
  return <div {...props} ref={ref}>{props.children}</div>
});

// const HtmlTooltip = withStyles(theme => ({
//   tooltip: {
//     backgroundColor: '#f5f5f9',
//     color: 'rgba(0, 0, 0, 0.87)',
//     maxWidth: 220,
//     fontSize: theme.typography.pxToRem(12),
//     border: '1px solid #dadde9',
//   },
// }))(Tooltip);

export const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}))(Tooltip);



