import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import "./LeaderboardBtn.scss";
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import highscoreDB from "./axios-highscore";


const LeaderboardBtn = (props) => {
  const [open, setOpen] = useState(false);
  const [highscores, setHighscores] = useState();


  const openLeaderboardH = () => {
    setOpen(!open);
  };

    
  const getDBHighscores = () => {
    let scoreArr = [];
    highscoreDB
      .get("/highscore.json")
      .then(response => {
        let highscoreJSON = Object.values(response.data);
        highscoreJSON.sort((a, b) => (a.score < b.score ? 1 : -1)).splice(10);
        setHighscores(highscoreJSON);
        // highscoreJSON.forEach(el =>
        //   scoreArr.push(`${el.name} - ${el.score} Pts.`)
        // );
        // props.fetchDB(highscoreJSON);
        // props.updateHighscoreBoard(false);
        // this.setState({
        //   scoreArr: scoreArr,
        //   fetching: false
        // });
      })
      .catch(error => {
        props.updateHighscoreBoard(false);
        // this.setState({
        //   fetching: false
        // });
      });
  };

  useEffect(() => {
    getDBHighscores();
  }, []);

  return (
      <div className='LeaderboardBtn'>
        <FontAwesomeIcon icon={faList} onClick={openLeaderboardH} />
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={open}
          onHide={() => setOpen(false)}
          className='LeaderboardModal'
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {text.highscoreModalTitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {highscores.map()}
          </Modal.Body>
        </Modal>
      </div>
  );
};


const mapStateToProps = state => {
  return {
    score: state.score,
    fetching: state.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDB: scoreArray =>
      dispatch({ type: "FETCH_DB_SCORES", scores: scoreArray }),
    updateHighscoreBoard: fetch =>
      dispatch({ type: "UPDATE_HS_BOARD", fetching: fetch })
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(LeaderboardBtn);
