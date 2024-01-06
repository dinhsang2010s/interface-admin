import {Select, SelectProps, message} from "antd";
import {useEffect, useState} from "react";
import {useGetCategories} from "../../api/category";
import {toUpperCaseFirst} from "../../utils/string";

interface Props extends SelectProps {
    onChange?: (value: string) => void;
    disabled?: boolean;
    width?: number;
}

interface OptionType {
    label: string;
    value: string;
}

export const CategorySelector = (props: Props) => {
    const [options, setOptions] = useState<OptionType[]>([]);
    const [query, setQuery] = useState<QueryDto>({
        offset: 0,
        pageSize: 20,
        orderBy: "",
        q: "",
    });
    useEffect(() => {
        useGetCategories(query)
            .then((res) => {
                const options = res.data?.map((option) => ({
                    label: toUpperCaseFirst(option.name),
                    value: option.id,
                }));

                setOptions(options);
            })
            .catch((err) => message.error(err?.message));
    }, [query]);

    const onChange = (value: string) => {
        props.onChange && props.onChange(value);
    };

    const onSearchValue = (value: string) => {
        setQuery({...query, q: value})
    }
    return (
        <Select
            {...props}
            allowClear
            showSearch
            filterOption={false}
            onSearch={onSearchValue}
            style={{width: props.width || "100%"}}
            placeholder="Select Category"
            disabled={props.disabled}
            onChange={onChange}
            options={options}
        />
    );
};
