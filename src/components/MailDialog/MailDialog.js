import React, {Component} from 'react';
import classes from './MailDialog.module.css';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import PuzzleHint from '../puzzle/PuzzleWord/PuzzleHint';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import Auxiliary from '../../hoc/Auxiliary';


class MailDialog extends Component {

    state = {
        sending: false,
  }

  sendHandler = () => {

    const templateId = 'template_uMFom1rL';

    const emailAddress = this.inputRef.value;
    const message = this.emailRef.value;
    const name = this.nameRef.value

  

    if(emailAddress !== '' && message !=='' && name !== '' ){
      this.setState({
        sending: true,
      })
      this.sendFeedback(templateId, {message_html: message, from_name: name, from_email: emailAddress}) 
    }
  
    }


    sendFeedback (templateId, variables ) {
      window.emailjs.send(
        'gmail',templateId,variables)
          .then(res => {
            console.log('Mail sended succesfully!');
            this.setState({
              sending: false,
              sended: true,
            });
            this.inputRef.value='';
            this.emailRef.value='';
            this.nameRef.value='';
          })
          .catch(error => {
            console.log('Error with sending email', error);
            this.setState({
              sending: false,
              sended: false});
          });
    }

  render() {

    
    return ( 
      <Auxiliary> 
      { this.props.showMailer ? 
      <form className={[classes.MailDialog, classes.SlideTop].join(' ')}>
      { this.state.sending ? 
        <LoadingSpinner /> :
        <Auxiliary>      
          <div>
            <input type='text' placeholder='Name' required ref={el => this.nameRef = el}/>
            <input type='text' placeholder='Your email address' name='emailAddress' required ref={el => this.inputRef = el}/>
            <FontAwesomeIcon icon={faTimes} className={classes.CancelIcon} onClick={this.props.mailerParentUpdate}/>
          </div>
          <textarea placeholder='Type your message here...' name='message' required ref={el => this.emailRef = el}></textarea>
          <button type='submit' className={classes.SubmitButton} onClick={this.sendHandler} >Send</button>
        </Auxiliary>
     }
      </form>
     : null }
     </Auxiliary> 
    )
  }
}

export default MailDialog;