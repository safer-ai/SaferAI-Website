import "./ColabLink.css";
const ColabLink = (props: { children: JSX.Element | string }) => {
  return (
    <a
      href="https://colab.research.google.com/drive/1J6zahRfPfqSyXlA1hm_KQCQlkcd3KVPc"
      className="colab-link"
    >
      {props.children}
    </a>
  ); // TODO: Replace link
};
export default ColabLink;
