import React from 'react';
import classes from './PuzzleHint.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'

const PuzzleHint = (props) => {
  return (
    <div className={classes.PuzzleHint}>
      <FontAwesomeIcon icon={faInfoCircle} />
      {/* {props.hintString} */}
    </div>
  )
}

export default PuzzleHint;