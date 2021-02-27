import React from "react"
import {textContent} from "../../../textContent/textContent"
import { connect } from "react-redux"
import './StatusMail.scss';

const MailStatus = props => {
  const text = textContent[props.lang]

  console.log(props.status);
  const textClassName = props.status ? 'success' : 'error';

  return (
      <div className='status-mail-container'>
      <p className={textClassName}>
        {props.status ? text.mailPosStatus : text.mailNegStatus}
      </p>
     </div>
  )
}

const mapStateToProps = state => {
  return {
    lang: state.lang,
  }
}

export default connect(mapStateToProps, null)(MailStatus)
