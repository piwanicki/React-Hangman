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
        emailForm: '',
        whoForm: '',
        message: '',
  }

  sendHandler = () => {

    const templateId = 'template_uMFom1rL';

    const emailAddress = this.inputRef.value;
    const message = this.emailRef.value;
    const name = this.nameRef.value

  

    if(emailAddress !== '' && message !=='' && name !== '' ){
      this.setState({
        sending: true,
        message: message,
        whoForm: name,
        emailForm: emailAddress
      })
      
      this.sendFeedback('badID', {message_html: message, from_name: name, from_email: emailAddress}) 
    }
  
    }


    sendFeedback (templateId, variables ) {
      window.emailjs.send('gmail',templateId,variables)
          .then(res => {
              this.setState({
                sending: false,
                status: true,
                sended: true,
                emailForm:'',
                whoForm: '',
                message: ''
              });
          })
          .catch(error => {
            this.setState({
              sending: false,
              status: false,
              sended: true});
           });

          setTimeout(() => {
            this.setState({
              sended: null
            })
          },2000)
    }

  render() {

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

    form = this.state.sended ? <StatusMail status={this.state.status} />  : form;
    
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