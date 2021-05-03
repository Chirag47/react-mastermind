import React from 'react';
import blackCircle from "../../assets/circle.png";
import whiteCircle from "../../assets/white-circle.png";
const StatusCircle = (props) => {
  let circle;
  if(props.statusValue === 0){
    circle = <i className="el-icon-close" style={{fontSize: '9px', border: "1px solid", borderRadius: '50%', padding: '2px'}}></i>
  } else if(props.statusValue === 1){
    circle = <img src={whiteCircle} height="15px"/>
  } else {
    circle = <img src={blackCircle} height="15px"/>
  }
  return (
    circle
  )
}

export default StatusCircle;