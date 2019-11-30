import React, { Component } from "react";
import classes from "./MailDialog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import Auxiliary from "../../hoc/Auxiliary";
import StatusMail from "./StatusMail/StatusMail";
import {connect} from 'react-redux';
import PuzzleHint from "../puzzle/PuzzleWord/PuzzleHint";
import Backdrop from "../../UI/Backdrop/Backdrop";

class MailDialog extends Component {
  state = {
    sending: false,
    status: null,
    emailForm: "",
    whoForm: "",
    message: ""
  };

  sendHandler = () => {
    //paste to senFeedback (template , ...)
    const templateId = "template_uMFom1rL";

    const emailAddress = this.inputRef.value;
    const message = this.emailRef.value;
    const name = this.nameRef.value;

    if (emailAddress !== "" && message !== "" && name !== "") {
      this.setState({
        sending: true,
        message: message,
        whoForm: name,
        emailForm: emailAddress
      });

      this.sendFeedback(templateId, {
        message_html: message,
        from_name: name,
        from_email: emailAddress
      });
    }
  };

  sendFeedback(templateId, variables) {
    window.emailjs
      .send("gmail", templateId, variables)
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            sending: false,
            status: true,
            sended: true,
            emailForm: "",
            whoForm: "",
            message: ""
          });
        }
      })
      .catch(error => {
        this.setState({
          sending: false,
          status: false,
          sended: true
        });

        console.log(error);
      });

    setTimeout(() => {
      this.setState({
        sended: null
      });
    }, 3000);
  }

  render() {
    let form = (
      <Auxiliary>
        <div>
          <input
            type="text"
            placeholder="Name"
            required
            ref={el => (this.nameRef = el)}
            defaultValue={this.state.whoForm}
          />
          <input
            type="text"
            placeholder="Your email address"
            name="emailAddress"
            required
            ref={el => (this.inputRef = el)}
            defaultValue={this.state.emailForm}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={classes.CancelIcon}
            onClick={this.props.mailerParentUpdate}
          />
        </div>
        <textarea
          placeholder="Type your message here..."
          name="message"
          required
          ref={el => (this.emailRef = el)}
          defaultValue={this.state.message}
        ></textarea>
        <button
          type="submit"
          className={classes.SubmitButton}
          onClick={this.sendHandler}
        >
          Send
        </button>
      </Auxiliary>
    );

    form = this.state.sended ? <StatusMail status={this.state.status} /> : form;

    return (
      <Auxiliary>
        {this.props.showMailer ? 
          <Backdrop show={true} clicked={this.props.mailerParentUpdate}>
            <form className={[classes.MailDialog, classes.SlideTop].join(" ")}>
              {this.state.sending ? <LoadingSpinner /> : form}
            </form>
          </Backdrop>
         : null}
      </Auxiliary>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    show: state.showBackdrop,
  }
}

export default connect(mapPropsToState,null)(MailDialog);
