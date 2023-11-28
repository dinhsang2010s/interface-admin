import { Table, TableProps } from "antd";
import { useRef } from "react";
import useComputeHeight from "../../hooks/useHeight";

const TableAntd = (props: TableProps<any>) => {
  const refHeight = useRef(null);
  const height = useComputeHeight(refHeight);

  return (
    <Table
      {...props}
      ref={refHeight}
      scroll={{
        y: height ? height - 140 : 500,
        x: 500,
      }}
    />
  );
};

export default TableAntd;
