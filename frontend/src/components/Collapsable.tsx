import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState } from "react";
import { Collapse } from "@mui/material";
import "./Collapsable.css";

type CollapsableProps = {
  children: JSX.Element[] | JSX.Element | string;
  text: string | JSX.Element;
};

const Collapsable = (props: CollapsableProps): JSX.Element => {
  const { text, children } = props;

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const className: string = "collapsable-head";

  return (
    <>
      <p className={className}>
        {collapsed ? (
          <ArrowRightIcon
            onClick={() => {
              setCollapsed(false);
            }}
            style={{ bottom: 0 }}
          />
        ) : (
          <ArrowDropDownIcon
            onClick={() => {
              setCollapsed(true);
            }}
            style={{ bottom: 0 }}
          />
        )}
        {text}
      </p>
      <Collapse in={!collapsed}>{children}</Collapse>
    </>
  );
};
export default Collapsable;
