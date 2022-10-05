import React, { useState } from "react";

const Redirect = (props: { to: string }) => {
  window.location.replace(props.to);
  return <></>;
};

export default Redirect;
