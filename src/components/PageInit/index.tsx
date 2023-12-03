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
        borderRadius: "6px",
      }}
    >
      <div
        className="page-nav flex"
        style={{
          justifyContent: "space-between",
        }}
      >
        <div
          className="flex-center"
          style={{
            background: "var(--bg-item-category-selected)",
            padding: "0px 32px",
            width: "25%",
            color: "var(--text-item-selected)",
            borderTopLeftRadius: 6,
          }}
        >
          <h3 className="nav-title">{`${props.title} lists`}</h3>
        </div>
        <div style={{ paddingTop: 20, paddingRight: 20 }}>
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
      </div>
      <div className="page-children" style={{ padding: "15px 20px 0px" }}>
        {props.children}
      </div>
    </div>
  );
};

export default PageInit;
