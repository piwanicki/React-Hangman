import React from 'react';
import {Link} from 'react-dom';


const GameLink = (props) => {
  return (
    <li>
      <div>
      <a href={props.to}/> 
        <p>{props.linkInfo}</p>
      </div>
    </li>
  )
}

export default GameLink;