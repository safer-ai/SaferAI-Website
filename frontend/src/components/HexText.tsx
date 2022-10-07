import React, { useState } from "react";

type HexTextProps = { text: string };

const HexText = (props: HexTextProps) => {
  const { text } = props;
  const imageStyle: any = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // filter:
    //   "invert(50%) sepia(70%) saturate(552%) hue-rotate(143deg) brightness(91%) contrast(96%)",
  };
  return (
    <div style={{ position: "relative" }}>
      <div>{text}</div>

      <img
        style={{ ...imageStyle, width: "9em" }}
        src={`/images/path576.svg`}
        alt=""
      />
      <img
        style={{ ...imageStyle, width: "8em" }}
        src={`/images/path578.svg`}
        alt=""
      />
    </div>
  );
};

export default HexText;
