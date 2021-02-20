import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faTrophy} from "@fortawesome/free-solid-svg-icons";
import "./LeaderboardBtn.scss";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {textContent} from "../../../../textContent/textContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {fetchHighscores} from "../../../../actions/highscores";
import Hourglass from "../../../../UI/Hourglass/Hourglass";

const LeaderboardBtn = (props) => {
  const [open, setOpen] = useState(true);

  const openLeaderboardH = () => {
    setOpen(!open);
  };

  useEffect(() => {
    props.fetchDB();
  }, []);

  const text = textContent[props.lang];

  const modalClasses = props.darkMode
    ? "LeaderboardModal darkMode"
    : "LeaderboardModal";

  const highscores = props.highscores;
  console.log(highscores);
  return (
    //<div className="LeaderboardBtn">
    <>
      <FontAwesomeIcon
        icon={faList}
        onClick={openLeaderboardH}
        className="LeaderboardBtn"
      />
      <Modal
        centered
        show={open}
        onHide={() => setOpen(false)}
        className={modalClasses}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {text.highscoreModalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.fetching && <Hourglass />}
          {highscores ? (
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} align="center" component="th">
                      <strong>{text.highscoreTableName}</strong>
                    </TableCell>
                    <TableCell align="right" component="th">
                      <strong>{text.highscoreTablePoints}</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {highscores.map((scoreObj, ix) => (
                    <TableRow key={scoreObj.name}>
                      <TableCell component="td" scope="row">
                        {ix + 1}.
                        {ix === 0 && (
                          <FontAwesomeIcon
                            icon={faTrophy}
                            className={"Trophy TrophyPlace1"}
                          />
                        )}
                        {ix === 1 && (
                          <FontAwesomeIcon
                            icon={faTrophy}
                            className={"Trophy TrophyPlace2"}
                          />
                        )}
                        {ix === 2 && (
                          <FontAwesomeIcon
                            icon={faTrophy}
                            className={"Trophy TrophyPlace3"}
                          />
                        )}
                      </TableCell>
                      <TableCell component="td" scope="row">
                        {scoreObj.name}
                      </TableCell>
                      <TableCell align="right">{scoreObj.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            text.noScores
          )}
        </Modal.Body>
      </Modal>
    </>
    //</div>
  );
};

const mapStateToProps = (state) => {
  return {
    score: state.score,
    fetching: state.hsFetching,
    lang: state.lang,
    darkMode: state.darkMode,
    highscores: state.highscores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDB: () => dispatch(fetchHighscores()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardBtn);
