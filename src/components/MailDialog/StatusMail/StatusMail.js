import React from 'react';
import classes from './StatusMail.module.css';
import {FontAwesome} from '@fortawesome/react-fontawesome';

const StatusMail = (props) => {

  const attachedClasses = [classes.Red, classes.Green];
  const statusClass  = props.status ? attachedClasses[1] : attachedClasses[0];
  let status;

  if (props.status) {
    status='Email send successfully!'
  } else {
    status='Something went wrong with sending email. Please try again... ;( '
  }

  return (
    <div className={[classes.StatusMail,statusClass].join(' ')}>
      <p>{status}</p>
    </div>
  )
}

export default StatusMail;