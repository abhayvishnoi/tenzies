import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "mediumspringgreen" : "white",
  };
  return (
    <div className="die" style={styles} onClick={props.toggle}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
