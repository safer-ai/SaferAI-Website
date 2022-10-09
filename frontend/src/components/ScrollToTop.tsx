// From https://www.kindacode.com/article/react-router-dom-scroll-to-top-on-route-change/

import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props: { children: any }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
