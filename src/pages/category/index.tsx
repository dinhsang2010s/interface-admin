import "./style.less";
import React, { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Table from "../../components/Table";
import HeaderPage from "../../components/HeaderPage";
import { Button, FormInstance, Popconfirm, Space, message } from "antd";
import { useGetCategories } from "../../api/category";
import { toLocalDate } from "../../utils/dateTime";
import { FuncTable } from "../../components/FuncTable";
import { useUpdateCategory } from "./add";

interface DataType {
  key: string;
  name: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<FormInstance<any>>(null);

  const [updateCategoryModal, showModalUpdateCategory] = useUpdateCategory();

  const columns: ColumnsType<DataType> = [
    {
      key: "sort",
      width: 10,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: () => -1,
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
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <FuncTable
            icon="fa-solid fa-pen-to-square"
            title="edit"
            onClick={() => showModalUpdateCategory(record)}
          />

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            //onConfirm={confirm}
            //onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <FuncTable icon="fa-solid fa-trash-can" title="delete" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = () => {
    setLoading(true);
    useGetCategories()
      .then((res) => {
        setCategories(res);
        setLoading(false);
      })
      .catch((err) => message.error(err?.message));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onRefetchCategories = () => fetchCategories();

  const onSearchCategory = (value: string) => {
    console.log("cate", value);
  };

  const onActionCategory = (category: unknown) => {
    const cat = category as ICategory;
    formRef.current?.setFieldsValue({
      name: "sad",
      description: "s",
    });
  };

  return (
    <div className="category">
      <div className="category-header">
        <div className="category-header-filter flex">
          <Button
            type="primary"
            icon={<i className="fa-solid fa-rotate"></i>}
            loading={loading}
            onClick={onRefetchCategories}
          >
            Refetch
          </Button>
        </div>

        <HeaderPage
          title="category"
          onSearch={onSearchCategory}
          onAdd={showModalUpdateCategory}
          onRefetch={fetchCategories}
        />
      </div>
      <Table
        pagination={
          categories.length > 20
            ? {
                defaultPageSize: 20,
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
