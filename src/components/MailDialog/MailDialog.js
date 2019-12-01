import React, { Component } from "react";
import classes from "./MailDialog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import Auxiliary from "../../hoc/Auxiliary";
import StatusMail from "./StatusMail/StatusMail";
import { connect } from "react-redux";
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
        if (res.text == "OK") {
          this.setState({
            sending: false,
            status: true,
            emailForm: "",
            whoForm: "",
            message: ""
          });
        }
      })
      .catch(error => {
        this.setState({
          sending: false,
          status: false
        });
        console.log(error);
      });

    setTimeout(() => {
      this.setState({
        status: null
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
            onClick={this.props.closeMailDialog}
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

    if (this.state.sending) {
      form = <LoadingSpinner />;
    }
    if (this.state.status) {
      form = <StatusMail status={this.state.status} />;
    }

    return (
      <>
        {this.props.show ? (
          <>
            <Backdrop
              show={this.props.show}
              clicked={this.props.closeMailDialog}
            />
            <form className={[classes.MailDialog, classes.SlideTop].join(" ")}>
              {form}
            </form>
          </>
        ) : null}
      </>
    );
  }
}

const mapPropsToState = state => {
  return {
    show: state.showMailDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMailDialog: () => dispatch({ type: "SHOW_MAIL_DIALOG" })
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(MailDialog);
