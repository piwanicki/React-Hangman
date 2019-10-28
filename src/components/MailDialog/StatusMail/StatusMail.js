import React from 'react';
import classes from './StatusMail.module.css';
import {FontAwesome} from '@fortawesome/react-fontawesome';

const StatusMail = (props) => {

  const attachedClasses = [classes.Red, classes.Green];
  const statusClass  = props.status ? attachedClasses[1] : attachedClasses[0];

  return (
    <div className={[classes.StatusMail,statusClass].join(' ')}>
      <p>{props.children}</p>
      
    </div>
  )
}

export default StatusMail;