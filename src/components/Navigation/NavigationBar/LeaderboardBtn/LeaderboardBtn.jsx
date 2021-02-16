import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import "./LeaderboardBtn.scss";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import highscoreDB from "./axios-highscore";
import {textContent} from "../../../../textContent/textContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const LeaderboardBtn = (props) => {
  const [open, setOpen] = useState(true);
  const [highscores, setHighscores] = useState();

  const openLeaderboardH = () => {
    setOpen(!open);
  };

  const getDBHighscores = () => {
    let scoreArr = [];
    highscoreDB
      .get("/highscore.json")
      .then((response) => {
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
      .catch((error) => {
        console.log(error);
        //props.updateHighscoreBoard(false);
        // this.setState({
        //   fetching: false
        // });
      });
  };

  useEffect(() => {
    getDBHighscores();
  }, []);

  const text = textContent[props.lang];

  const modalClasses = props.darkMode ? 'LeaderboardModal darkMode' : 'LeaderboardModal';

  return (
    <div className="LeaderboardBtn">
      <FontAwesomeIcon icon={faList} onClick={openLeaderboardH} />
      <Modal
        centered
        show={open}
        onHide={() => setOpen(false)}
        className={modalClasses}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {text.highscoreModalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>{text.highscoreTableName}</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{text.highscoreTablePoints}</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {highscores &&
                  highscores.map((scoreObj, ix) => (
                    <TableRow key={scoreObj.name}>
                      <TableCell component="th" scope="row">
                        {scoreObj.name}
                      </TableCell>
                      <TableCell align="right">{scoreObj.score}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    score: state.score,
    fetching: state.fetching,
    lang: state.lang,
    darkMode: state.darkMode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchDB: (scoreArray) =>
    //   dispatch({type: "FETCH_DB_SCORES", scores: scoreArray}),
    // updateHighscoreBoard: (fetch) =>
    //   dispatch({type: "UPDATE_HS_BOARD", fetching: fetch}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardBtn);
