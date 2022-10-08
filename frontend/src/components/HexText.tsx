type HexTextProps = { text: string };

const HexText = (props: HexTextProps) => {
  const { text } = props;
  const imageStyle: any = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    margin: 0,
    // filter:
    //   "invert(50%) sepia(70%) saturate(552%) hue-rotate(143deg) brightness(91%) contrast(96%)",
  };
  return (
    <div
      style={{
        position: "relative",
        height: "160px",
        width: "160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: 0,
      }}
    >
      <div style={{ textAlign: "center", fontSize: "24px" }}>{text}</div>

      <img
        style={{ ...imageStyle, width: "160px" }}
        src={`/images/path576.svg`}
        alt=""
      />
      <img
        style={{ ...imageStyle, width: "140px" }}
        src={`/images/path578.svg`}
        alt=""
      />
    </div>
  );
};

export default HexText;
