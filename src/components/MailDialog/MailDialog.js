import React from 'react';
import classes from './MailDialog.module.css';
import Draggable from 'react-draggable';

const MailDialog = (props) => {

  return (
      <form className={classes.MailDialog}>
        <input type='text' placeholder='Your email address' name='emailAddress' required/>
        <textarea placeholder='Type your message...' name='message'></textarea>
        <div className={classes.Button}>Send</div>
        <div className={classes.Button}>Cancel</div>
      </form>
  )
}

export default MailDialog;