import "./ColabLink.css";
const ColabLink = (props: { children: JSX.Element | string }) => {
  return (
    <a href="https://colab.research.google.com/" className="colab-link">
      {props.children}
    </a>
  ); // TODO: Replace link
};
export default ColabLink;
