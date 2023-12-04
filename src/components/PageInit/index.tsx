import "./style.less";
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
    <div className={`page ${props.title.toLowerCase()}`}>
      <div className="page-nav flex">
        <h3 className="nav-title">{`${props.title} lists`}</h3>
        <div className="nav-function flex">
          <Search
            placeholder={`Search ${props.title}...`}
            onChange={onChange}
            style={{ maxWidth: 350 }}
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
      <div className="page-children" style={{ padding: "10px 20px" }}>
        {props.children}
      </div>
    </div>
  );
};

export default PageInit;
