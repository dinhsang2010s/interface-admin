import "./style.less";
import {Button, Dropdown, Select} from "antd";
import Search from "../Search";
import {debounce} from "lodash";
import {useEffect, useState} from "react";

interface Props {
    title: string;
    onSearch?: (value: string) => void;
    onAdd?: () => void;
    onRefresh?: () => void;
    disabledAdd?: boolean;
    disabledSearch?: boolean;
    dataOnSearch?: ICategory[];
}

const HeaderPage = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [menu, setMenu] = useState<ICategory[]>([]);

    useEffect(() => {
        setMenu(props.dataOnSearch ?? []);
    }, [props.dataOnSearch]);

    const debouncedSearch = debounce((value) => {
        if (props.onSearch) props.onSearch(value);
    }, 500);

    const onChange = (value: string) => {
        if (value) {
            debouncedSearch(value);
            setOpen(true);
        } else setOpen(false);
    };

    return (
        <div className={`header-function-page ${props.title.toLowerCase()}`}>
            <Dropdown open={open} overlay={<Select/>}>
                <Search
                    className={`search search_${props.title.toLowerCase()}`}
                    placeholder={`Search ${props.title}...`}
                    disabled={props.disabledSearch}
                    onChangeInput={onChange}
                    loading={open}
                    prefix={<i className="fa fa-search"></i>}
                    allowClear
                />
            </Dropdown>
            <Button
                style={{marginLeft: 12}}
                type="primary"
                icon={<i className="fa-solid fa-plus"></i>}
                onClick={props.onAdd}
                disabled={props.disabledAdd}
            >
                {`Add ${props.title}`}
            </Button>
        </div>
    );
};

export default HeaderPage;
