import "./style.less";
import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Table from "../../components/Table";
import PageInit from "../../components/PageInit";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    key: "sort",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

export const Category = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address:
        "Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ]);

  const onSearchCategory = (value: string) => {
    console.log("cate", value);
  };

  return (
    <PageInit title="Category" onChangeValueSearch={onSearchCategory}>
      <Table
        pagination={
          dataSource.length > 20
            ? {
                defaultPageSize: 20,
                showSizeChanger: true,
                pageSizeOptions: ["20", "50", "100"],
              }
            : false
        }
        rowKey="key"
        columns={columns}
        dataSource={dataSource}
      />
    </PageInit>
  );
};
