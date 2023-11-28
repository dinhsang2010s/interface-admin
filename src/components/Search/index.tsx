import { Input } from "antd";
import "./style.less";
import { CSSProperties, useState } from "react";
import React from "react";
import { debounce } from "lodash";

interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
  style?: CSSProperties | undefined;
  onChange: (value: string) => void;
}

const Search = (props: Props) => {
  const [value, setValue] = useState<string>("");

  const onChange = (value: string) => {
    props.onChange(value);
  };

  const debounced = React.useCallback(debounce(onChange, 500), []);

  return (
    <Input
      className={`search-input ${props.className}`}
      style={props.style}
      prefix={<i className="fa fa-search"></i>}
      placeholder={props.placeholder ?? "Search..."}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        debounced(e.target.value);
      }}
    />
  );
};

export default Search;
