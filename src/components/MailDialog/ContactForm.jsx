import React, {useState, useRef} from "react";
import {Form, Row, Col, Button, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {textContent} from "../../textContent/textContent";
import MailStatus from "./StatusMail/StatusMail";
import emailjs, {init} from "emailjs-com";
import "./ContactForm.scss";
import Hourglass from "../../UI/Hourglass/Hourglass";
init("user_FMRAyDRBNGHK526Xb03EA");

const ContactForm = (props) => {
  const text = textContent[props.lang];

  const [mailStatus, setMailStatus] = useState(null);
  const [mailStatusShow, setMailStatusShow] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const nameInput = useRef(null);
  const surnameInput = useRef(null);
  const emailInput = useRef(null);
  const msgInput = useRef(null);

  const hideMailStatus = () => {
    setTimeout(() => setMailStatusShow(false), 2000);
  };

  const emailSendHandler = (e) => {
    e.preventDefault();
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

    emailjs
      .send(
        "default_service",
        "template_1x23r1m",
        templateParams,
        "user_FMRAyDRBNGHK526Xb03EA"
      )
      .then(
        function (response) {
          setMailStatus(response.status);
          setMailStatusShow(true);
          setIsSending(false);
          hideMailStatus();
        },
        function (error) {
          setMailStatus(false);
          setMailStatusShow(true);
          setIsSending(false);
          hideMailStatus();
        }
      );
  };

  let modalHeaderClasses = "";
  let modalBodyClasses = "";
  let modalFooterClasses = "";

  if (props.darkMode) {
    modalHeaderClasses = "DarkModalHeader";
    modalBodyClasses = "GrayBgColor";
    modalFooterClasses = "DarkModalFooter";
  }

  return (
    <Modal
      show={props.contactModalShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.setContactModalShow}
      className={"ContactForm"}
    >
      <Modal.Header
        closeButton={props.setContactModalShow}
        className={modalHeaderClasses}
      >
        <Modal.Title>{text.contact}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={emailSendHandler}>
        <Modal.Body className={modalBodyClasses}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>{text.name}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={text.name}
                  ref={nameInput}
                  required
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
                  required
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
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>{text.msgText}</Form.Label>
                <Form.Control as="textarea" rows={10} ref={msgInput} required />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className={modalFooterClasses}>
          {!mailStatusShow ? (
            isSending ? (
              <Hourglass />
            ) : (
              <Button variant="outline-dark" type="submit" disabled={isSending}>
                {text.mailSendBtn}
              </Button>
            )
          ) : (
            <MailStatus status={mailStatus} />
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    lang: state.lang,
    contactModalShow: state.showMailDialog,
    darkMode: state.darkMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setContactModalShow: () => dispatch({type: "SHOW_MAIL_DIALOG"}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
