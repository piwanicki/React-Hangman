import React, {Component} from 'react';
import classes from './MailDialog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import Auxiliary from '../../hoc/Auxiliary';
import StatusMail from './StatusMail/StatusMail';

class MailDialog extends Component {

    state = {
        sending: false,
        status: null,
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
      this.sendFeedback('badID', {message_html: message, from_name: name, from_email: emailAddress}) 
    }
  
    }


    sendFeedback (templateId, variables ) {
      window.emailjs.send(
        'gmail',templateId,variables)
          .then(res => {
              console.log('Mail sended succesfully!');
              this.setState({
                sending: false,
                status: true,
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
              status: false,
              sended: true});
          });   
    }

  render() {

    let status;

    if (this.state.status) {
      status='Email send successfully!'
    } else {
      status='Something went wrong with sending email. Please try again... ;( '
    }

    let form = (       
       <Auxiliary>      
          <div>
            <input type='text' placeholder='Name' required ref={el => this.nameRef = el}/>
            <input type='text' placeholder='Your email address' name='emailAddress' required ref={el => this.inputRef = el}/>
            <FontAwesomeIcon icon={faTimes} className={classes.CancelIcon} onClick={this.props.mailerParentUpdate}/>
          </div>
          <textarea placeholder='Type your message here...' name='message' required ref={el => this.emailRef = el}></textarea>
          <button type='submit' className={classes.SubmitButton} onClick={this.sendHandler} >Send</button>
       </Auxiliary>
    )


    form = this.state.sended ? <StatusMail status={this.state.status}>{status}</StatusMail>  : form;
    


    return ( 
      <Auxiliary> 
      { this.props.showMailer ? 
      <form className={[classes.MailDialog, classes.SlideTop].join(' ')}>
      { this.state.sending ? 
        <LoadingSpinner /> : form
      }
      </form>
     : null }
     </Auxiliary> 
    )
  }
}

export default MailDialog;