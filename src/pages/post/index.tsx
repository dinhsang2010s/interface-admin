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
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import TableAntd from "../../components/Table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
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
  {
    key: "sort",
    width: "70px",
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

  return (
    <div className="category">
      <h1 className="title"> Category</h1>
      <div className="nav-category">
        {/* <Search /> */}
        <Button
          className="add-category"
          type="primary"
          icon={<i className="fa-solid fa-plus"></i>}
        >
          Create New Category
        </Button>
      </div>
      <div className="table-category">
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <TableAntd
              components={{
                body: {
                  row: Row,
                },
              }}
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
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
