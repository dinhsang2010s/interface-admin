import "./style.less";
import { Button } from "antd";
import Search from "../Search";
import { debounce } from "lodash";

interface Props {
  title: string;
  onSearch?: (value: string) => void;
  onAdd?: () => void;
  onRefetch?: () => void;
  children?: React.ReactNode;
}

const HeaderPage = (props: Props) => {
  const debouncedSearch = debounce((value) => {
    if (props.onSearch) props.onSearch(value);
  }, 500);

  const onChange = (value: string) => debouncedSearch(value);

  return (
    <div className={`header-function-page ${props.title.toLowerCase()}`}>
      <Search
        className={`search search_${props.title.toLowerCase()}`}
        placeholder={`Search ${props.title}...`}
        onChange={onChange}
      />
      <Button
        style={{ marginLeft: 12 }}
        type="primary"
        icon={<i className="fa-solid fa-plus"></i>}
        onClick={props.onAdd}
      >
        {`Add ${props.title}`}
      </Button>
      {props.children}
    </div>
  );
};

export default HeaderPage;
