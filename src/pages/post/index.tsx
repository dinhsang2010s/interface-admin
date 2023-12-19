import "./style.less";
import { MenuOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Table from "../../components/Table";
import HeaderPage from "../../components/HeaderPage";
import { Form, Select, SelectProps, Space } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    key: "sort",
    width: "50px",
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
  {
    key: "age",
    title: "Age",
    dataIndex: "age",
  },
  {
    key: "address",
    title: "Address",
    dataIndex: "address",
  },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === "sort") {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: "none", cursor: "move" }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

const data: DataType[] = [];
for (let i = 1; i <= 21; i++) {
  data.push({
    key: `${i}`,
    name: `Edward ${i}`,
    age: i,
    address: `London Park no. ${i}`,
  });
}

const options: SelectProps["options"] = [
  {
    label: "China",
    value: "china",
    emoji: "🇨🇳",
    desc: "China (中国)",
  },
  {
    label: "USA",
    value: "usa",
    emoji: "🇺🇸",
    desc: "USA (美国)",
  },
  {
    label: "Japan",
    value: "japan",
    emoji: "🇯🇵",
    desc: "Japan (日本)",
  },
  {
    label: "Korea",
    value: "korea",
    emoji: "🇰🇷",
    desc: "Korea (韩国)",
  },
  {
    label: "Chisna",
    value: "chiana",
    emoji: "🇨🇳",
    desc: "China (中国)",
  },
  {
    label: "USdA",
    value: "usasda",
    emoji: "🇺🇸",
    desc: "USA (美国)",
  },
  {
    label: "Jadpan",
    value: "japaaan",
    emoji: "🇯🇵",
    desc: "Japan (日本)",
  },
  {
    label: "Kosarea",
    value: "sds",
    emoji: "🇰🇷",
    desc: "Korea (韩国)",
  },
];

export const Post = () => {
  const [dataSource, setDataSource] = useState(data);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  const onSearchPost = (value: string) => {
    console.log("asdasd", value);
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-filter w-full flex">
          <h4 className="title-filter">Filters:</h4>
          <Form
            className="form-filter w-full"
            name="basic"
            onFinish={() => {}}
            autoComplete="off"
          >
            <Form.Item label="Categories" name="categories">
              <Select
                className="select-filter w-full"
                mode="multiple"
                placeholder="select one country"
                onChange={() => {}}
                optionLabelProp="label"
                options={options}
                optionRender={(option: any) => (
                  <Space>
                    <span role="img" aria-label={option.data.label}>
                      {option.data.emoji}
                    </span>
                    {option.data.desc}
                  </Space>
                )}
              />
            </Form.Item>
          </Form>
        </div>
        <HeaderPage title="post" onSearch={() => {}} />
      </div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{ body: { row: Row } }}
            pagination={
              dataSource.length > 20
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
            dataSource={dataSource}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};
