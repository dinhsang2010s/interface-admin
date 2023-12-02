import { Button } from "antd";
import Search from "../Search";

interface Props {
  title: string;
  children?: React.ReactNode;
  onChangeValueSearch: (value: string) => void;
}

const PageInit = (props: Props) => {
  const onChange = (value: string) => {
    props.onChangeValueSearch(value);
  };

  return (
    <div
      className={`page ${props.title.toLowerCase()}`}
      style={{
        background: "var(--bg-component)",
        padding: "12px 20px 0px",
        borderRadius: "6px",
      }}
    >
      <div
        className="page-nav flex-center"
        style={{ justifyContent: "space-between", marginBottom: 5 }}
      >
        <h3
          style={{
            background: "var(--theme-background)",
            padding: 6,
            borderRadius: 6,
            boxShadow: "var(--box-shadow)",
          }}
          className="nav-title"
        >{`${props.title} lists`}</h3>
        <div className="nav-function flex">
          <Search
            placeholder={`Search ${props.title}...`}
            onChange={onChange}
          />
          <Button
            style={{ marginLeft: 20 }}
            type="primary"
            icon={<i className="fa-solid fa-plus"></i>}
          >
            {`Add ${props.title}`}
          </Button>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default PageInit;
