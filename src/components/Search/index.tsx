import { Input } from "antd";
import "./style.less";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";

interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Search = (props: Props) => {
  const [value, setValue] = useState<string>("");

  const debouncedChangeHandler = (e: any) => {
    setValue(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <Input
      className={`search-input ${props.className}`}
      style={{
        width: props.width ?? "auto",
        height: props.height ?? "auto",
      }}
      prefix={<i className="fa fa-search"></i>}
      placeholder={props.placeholder ?? "Search..."}
      value={value}
      onChange={debouncedChangeHandler}
    />
  );
};

export default Search;
