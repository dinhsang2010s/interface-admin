import "./style.less";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Table from "../../components/Table";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Popconfirm,
  Select,
  Space,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { DeleteCategory, useGetCategories } from "../../api/category";
import { toLocalDate } from "../../utils/dateTime";
import { FuncTable } from "../../components/FuncTable";
import { useUpdateCategory } from "./useUpdate";
import { debounce } from "lodash";

interface DataType {
  key: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateCategoryModal, showModalUpdateCategory] = useUpdateCategory();
  const [options, setOptions] = useState<ICategory[]>([]);
  const [value, setValue] = useState<string>("");
  const columns: ColumnsType<DataType> = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: () => -1,
      render: (_, record: any) => (
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
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: record?.status === 1 ? "green" : "red",
            }}
          />
          <span>{record?.name}</span>
        </div>
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
      render: (text: string) => (
        <span style={{ textAlign: "center" }}>{toLocalDate(text)}</span>
      ),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_, record: any) => (
        <Space size="middle">
          <FuncTable
            icon="fa-solid fa-pen-to-square"
            title="edit"
            onClick={() => showModalUpdateCategory(record, refetch)}
          />

          <Popconfirm
            title="Are you sure to delete this category?"
            description={`Delete the ${record?.name}`}
            placement="leftTop"
            onConfirm={() => onDeleteCategory(record?.id)}
            okText="Yes"
            cancelText="No"
          >
            <FuncTable icon="fa-solid fa-trash-can" title="delete" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const refetch = () => {
    useGetCategories()
      .then((res) => setCategories(res))
      .catch((err) => message.error(err?.message));
  };

  useEffect(() => {
    refetch();
  }, []);

  const onRefetch = () => {
    setLoading(true);
    refetch();
    setLoading(false);
    setValue("");
  };

  const debouncedSearch = debounce((value) => {
    useGetCategories(value)
      .then((res) => setOptions(res))
      .catch((err) => message.error(err?.message));
  }, 500);

  const onSearchCategory = (e: any) => {
    setValue(e.target.value);
    if (e.target.value) {
      setLoading(true);
      debouncedSearch(e.target.value);
    } else {
      setLoading(false);
      refetch();
    }
  };

  const onDeleteCategory = async (id: string) => {
    await DeleteCategory(id);
    onRefetch();
  };

  const onSelectSearch = (category: ICategory) => {
    setCategories([{ ...category }]);
    setLoading(false);
  };

  return (
    <div className="category">
      <div className="category-header">
        <div className="flex-center">
          <Button
            icon={<i className="fa-solid fa-rotate"></i>}
            onClick={onRefetch}
          >
            Refetch
          </Button>
          <Dropdown
            open={loading}
            overlay={
              <Menu>
                {options.map((option) => (
                  <Menu.Item
                    onClick={() => onSelectSearch(option)}
                    key={option.id}
                  >
                    {option.name}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Input
              value={value}
              onChange={onSearchCategory}
              style={{ width: 250, margin: "0px 12px" }}
              placeholder="Search to category..."
              suffix={
                loading ? (
                  <LoadingOutlined spin />
                ) : (
                  <i className="fa fa-search"></i>
                )
              }
            />
          </Dropdown>
        </div>
        <Button
          type="primary"
          icon={<i className="fa-solid fa-plus"></i>}
          onClick={() => showModalUpdateCategory(undefined, refetch)}
        >
          Add
        </Button>
      </div>
      <Table
        pagination={
          categories.length > 10
            ? {
                pageSize: 20,
                showSizeChanger: true,
                pageSizeOptions: ["20", "50", "100"],
                showQuickJumper: true,
              }
            : false
        }
        rowKey="key"
        columns={columns}
        dataSource={categories}
      />
      {updateCategoryModal}
    </div>
  );
};
