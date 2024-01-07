import "./style.less";
import { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import {
  Button,
  Input,
  Pagination,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDeleteCategory, useGetCategories } from "../../api/category";
import { toLocalDate } from "../../utils/dateTime";
import { FuncTable } from "../../components/FuncTable";
import { debounce } from "lodash";
import { useUpdate } from "./useUpdate";
import { toUpperCaseFirst } from "../../utils/string";
import useComputeHeight from "../../hooks/useHeight";

export const Category = () => {
  const refHeight = useRef(null);
  const height = useComputeHeight(refHeight);
  const [categories, setCategories] = useState<IPagination<ICategory[]>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [element, show] = useUpdate();
  const [value, setValue] = useState<string>("");
  const [query, setQuery] = useState<QueryDto>({
    offset: 0,
    pageSize: 20,
    orderBy: "",
    q: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const columns: ColumnsType<ICategory> = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: () => -1,
      render: (_, record: ICategory) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <div
            style={{
              marginRight: 10,
              width: 10,
              minWidth: 10,
              height: 10,
              borderRadius: "50%",
              background: record.status === 1 ? "green" : "red",
            }}
          />
          <div
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {toUpperCaseFirst(record?.name)}
          </div>
        </div>
      ),
    },
    {
      key: "createdBy",
      title: "CreatedBy",
      dataIndex: "createdBy",
      render: (text: string) =>
        text ? (
          <Tag color="var(--theme-primary)" key={text}>
            {text}
          </Tag>
        ) : (
          ""
        ),
    },
    {
      key: "updatedBy",
      title: "UpdatedBy",
      dataIndex: "updatedBy",
      render: (text: string) =>
        text ? (
          <Tag color="#008000" key={text}>
            {text}
          </Tag>
        ) : (
          ""
        ),
    },
    {
      key: "createdAt",
      title: "CreatedTime",
      dataIndex: "createdAt",
      render: (text: string) => <span>{toLocalDate(text)}</span>,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      key: "updatedAt",
      title: "UpdatedTime",
      dataIndex: "updatedAt",
      render: (text: string) => <span>{toLocalDate(text)}</span>,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_, record: ICategory) => (
        <Space size="middle">
          <FuncTable title="edit" onClick={() => show(refresh, record)} />
          <Popconfirm
            title="Are you sure to delete this category?"
            description={`Delete the [ ${record.name} ]`}
            placement="leftTop"
            onConfirm={() => onDeleteCategory(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <FuncTable title="delete" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const refresh = (queryInput?: QueryDto) => {
    useGetCategories(queryInput ?? query)
      .then((res) => setCategories(res))
      .catch((err) => message.error(err?.message));
  };

  useEffect(() => {
    refresh();
  }, []);

  const onRefresh = () => {
    setLoading(true);
    setValue("");
    setCurrentPage(1);
    refresh({ offset: 0, pageSize: 20, orderBy: "", q: "" });
    setLoading(false);
  };

  const debouncedSearch = debounce((value) => {
    useGetCategories(value)
      .then((res) => setCategories(res))
      .catch((err) => message.error(err?.message));
  }, 500);

  const onSearchCategory = (e: any) => {
    setValue(e.target.value);
    if (e.target.value) {
      setLoading(true);
      debouncedSearch(e.target.value);
    } else {
      setLoading(false);
      refresh();
    }
  };

  const onDeleteCategory = async (id: string) => {
    await useDeleteCategory(id);
    onRefresh();
  };

  const onChangeQuery = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setQuery({
      ...query,
      offset: pageSize * (page - 1),
      pageSize,
      orderBy: "",
      q: "",
    });
  };

  return (
    <div className="category">
      <div className="category-header">
        <div className="flex-center">
          <div
            style={{
              marginRight: 12,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>Total</span>
            <span style={{ margin: "0px 2px" }}>:</span>
            <span>{categories?.total}</span>
          </div>
          <Button
            style={{ marginRight: 12 }}
            icon={<i className="fa-solid fa-rotate"></i>}
            onClick={onRefresh}
          >
            Refresh
          </Button>
          <Input
            value={value}
            onChange={onSearchCategory}
            style={{ width: 250, marginRight: 12 }}
            placeholder="Search to category..."
            suffix={
              loading ? (
                <LoadingOutlined spin />
              ) : (
                <i className="fa fa-search"></i>
              )
            }
          />
        </div>
        <Button
          type="primary"
          icon={<i className="fa-solid fa-plus"></i>}
          onClick={() => show(refresh)}
        >
          Add
        </Button>
      </div>
      <div
        className="category-list"
        ref={refHeight}
        style={{ height: height - 70 }}
      >
        <Table
          rowKey="key"
          pagination={false}
          scroll={{
            y: height ? height - 125 : 500,
            x: 500,
          }}
          columns={columns}
          dataSource={categories?.data}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          marginTop: 10,
        }}
      >
        <Pagination
          showQuickJumper
          total={categories?.total}
          pageSize={20}
          showSizeChanger={true}
          current={currentPage}
          pageSizeOptions={["20", "50", "100"]}
          onChange={onChangeQuery}
        />
      </div>
      {element}
    </div>
  );
};
