import React from 'react';
import classes from './PuzzleHint.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import ReactHover from 'react-hover';

const optionsCursorHover = {
  followCursor:false,
  shiftX: 0,
  shiftY: 0
}

const PuzzleHint = (props) => {
  return (
    <div className={classes.PuzzleHintContainer}>
      <ReactHover options={optionsCursorHover}>
        <ReactHover.Trigger type='trigger'>
          <FontAwesomeIcon icon={faInfoCircle} />
        </ReactHover.Trigger>
        <ReactHover.Hover type='hover'>
          <div className={classes.hover}>
            <blockquote className={classes.quote}>{props.hintString}</blockquote>
          </div>
        </ReactHover.Hover>
      </ReactHover>
    </div>
  )
}

export default PuzzleHint;