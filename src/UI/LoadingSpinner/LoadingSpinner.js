import React from 'react';
import classes from './LoadingSpinner.module.scss';
import loader from './loader4.gif';

const LoadingSpinner = (props) => {
  return (
    // <div className={classes.Loader}></div>
    <img src={loader} />
  )
}

export default LoadingSpinner;