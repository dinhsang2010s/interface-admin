import {Input, InputProps} from "antd";
import "./style.less";
import {useCallback, useState} from "react";
import {debounce} from "lodash";
import {LoadingOutlined} from "@ant-design/icons";

interface Props extends InputProps {
    onChangeInput?: (value: string) => void;
    loading?: boolean;
}

export const Search = (props: Props) => {
    const [value, setValue] = useState<string>("");

    const onChange = (value: string) => {
        if (props.onChangeInput) props.onChangeInput(value);
    };

    const debounced = useCallback(debounce(onChange, 500), []);

    return (
        <Input
            {...props}
            className={`search-input ${props.className}`}
            suffix={props.loading ? <LoadingOutlined spin/> : ""}
            placeholder={props.placeholder ?? "Search..."}
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
                debounced(e.target.value);
            }}
        />
    );
};