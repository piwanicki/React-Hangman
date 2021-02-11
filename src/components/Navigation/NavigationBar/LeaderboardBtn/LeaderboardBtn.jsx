import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import "./LeaderboardBtn.scss";
import {Modal} from "react-bootstrap";

const LeaderboardBtn = (props) => {
  const [open, setOpen] = useState(false);

  const openLeaderboardH = () => {
    setOpen(!open);
  };

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
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
        </Modal>
      </div>
  );
};

export default LeaderboardBtn;
