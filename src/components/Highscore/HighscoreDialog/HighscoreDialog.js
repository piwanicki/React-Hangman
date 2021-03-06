import React, {Component} from "react";
import classes from "./HighscoreDialog.module.scss";
import {connect} from "react-redux";
import highscoreInstance from "../../../axios/axios-highscore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {Modal, Form, Button} from "react-bootstrap";
import {textContent} from "../../../textContent/textContent";
import {fetchHighscores} from "../../../actions/highscores";

class HighscoreDialog extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.text = textContent[this.props.lang];
  }

  sendHighscoreToDB = () => {
    const input = this.inputRef.current;
    const highscore = {
      name: input.value,
      score: this.props.score,
    };
    highscoreInstance
      .post("/highscore.json", highscore)
      .then((response) => {
        this.props.fetchDB();
        this.props.closeHighscoreDialog();
      })
      .catch((error) => console.log(error));
  };

  render() {
    let modalHeaderClasses = "";
    let modalBodyClasses = "";
    let modalFooterClasses = "";

    if (this.props.darkMode) {
      modalHeaderClasses = classes.DarkModalHeader;
      modalBodyClasses = classes.GrayBgColor;
      modalFooterClasses = classes.DarkModalFooter;
    }

    return (
      <Modal
        show={this.props.show}
        centered
        onHide={this.props.closeHighscoreDialog}
        className={classes.HighscoreModal}
      >
        <Modal.Header closeButton className={modalHeaderClasses}>
          <Modal.Title>{this.text.hsModalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalBodyClasses}>
          <p className={classes.ScoreInfo}>
            {this.text.yourScore} : <strong>{this.props.scoreStrike}</strong>
          </p>
          <FontAwesomeIcon icon={faThumbsUp} className={classes.Like} />
          <p>{this.text.hsModalBody}</p>
          <Form.Control
            type="text"
            placeholder={this.text.name}
            maxLength={20}
            className={classes.NameInput}
            ref={this.inputRef}
          ></Form.Control>
        </Modal.Body>
        <Modal.Footer className={modalFooterClasses}>
          <Button variant="secondary" onClick={this.props.closeHighscoreDialog}>
            {this.text.closeBtn}
          </Button>
          <Button variant="dark" onClick={this.sendHighscoreToDB}>
            {this.text.sendBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    show: state.showHighscoreDialog,
    score: state.score,
    lang: state.lang,
    darkMode: state.darkMode,
    highscores: state.highscores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeHighscoreDialog: () => dispatch({type: "SHOW_HIGHSCORE_DIALOG"}),
    fetchDB: () => dispatch(fetchHighscores()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HighscoreDialog);
