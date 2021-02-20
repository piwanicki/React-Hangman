import React, { useState, useRef } from "react";
import { Form, Row, Col, Button, ProgressBar, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { textContent } from "../../textContent/textContent";
// import MailStatus from "./mailStatus"
// import emailjs, { init } from "emailjs-com"
// import Captcha from "./recaptcha"
import classes from "./ContactForm.module.scss";
//init("user_FMRAyDRBNGHK526Xb03EA")

const ContactForm = (props) => {
  const text = textContent[props.lang];

  const [mailStatus, setMailStatus] = useState(null);
  const [mailStatusShow, setMailStatusShow] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isShowCaptcha, setShowCaptcha] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const nameInput = useRef(null);
  const surnameInput = useRef(null);
  const emailInput = useRef(null);
  const msgInput = useRef(null);

  // const captchaHandler = value => {
  //   setIsValid(value)
  //   console.log(isValid)
  //   console.log(value)
  // }

  const emailSendHandler = (e) => {
    //setShowCaptcha(true)
    e.preventDefault();
    if (isShowCaptcha) {
      setIsSending(true);
      const name = nameInput.current.value;
      const surname = surnameInput.current.value;
      const email = emailInput.current.value;
      const msg = msgInput.current.value;

      const templateParams = {
        to_name: "Paweł",
        from_name: `${name} ${surname}`,
        email: email,
        message: msg,
      };

      // emailjs
      //   .send(
      //     "default_service",
      //     "template_1x23r1m",
      //     templateParams,
      //     "user_FMRAyDRBNGHK526Xb03EA"
      //   )
      //   .then(
      //     function (response) {
      //       setMailStatus(response.status)
      //       setMailStatusShow(true)
      //       setIsSending(false)
      //     },
      //     function (error) {
      //       setMailStatus(false)
      //       setMailStatusShow(true)
      //       setIsSending(false)
      //     }
      //   )
    }
  };

  let modalHeaderClasses = "";
  let modalBodyClasses = "";
  let modalFooterClasses = '';

  if (props.darkMode) {
    modalHeaderClasses = classes.DarkModalHeader;
    modalBodyClasses = classes.GrayBgColor;
    modalFooterClasses = classes.DarkModalFooter;
  }

  return (
    <Modal
      show={props.contactModalShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.setContactModalShow}
      className={classes.ContactForm}
    >
        <Modal.Header
          closeButton={props.setContactModalShow}
          className={modalHeaderClasses}
        >
          <Modal.Title>{text.contact}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalBodyClasses}>
          <Form onSubmit={emailSendHandler}>
            {/* {mailStatus && <MailStatus status={mailStatus}/>} */}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>{text.name}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={text.name}
                    ref={nameInput}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>{text.lastname}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={text.lastname}
                    ref={surnameInput}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>{text.email}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    ref={emailInput}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>{text.msgText}</Form.Label>
                  <Form.Control as="textarea" rows={10} ref={msgInput} />
                </Form.Group>
              </Col>
            </Row>

            <Row noGutters>
              {/* {isShowCaptcha ? (
                <Captcha captchaHandler={captchaHandler} />
            ) : ( */}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className={modalFooterClasses}>
          <Button variant="dark" type="submit" disabled={isSending}>
            {text.sendBtn}
          </Button>
          {isSending && (
            <ProgressBar className="bar" animated now={100} variant="info" />
          )}
        </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    lang: state.lang,
    contactModalShow: state.showMailDialog,
    darkMode: state.darkMode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setContactModalShow: () => dispatch({ type: "SHOW_MAIL_DIALOG" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
