import { Table as TableAntd, TableProps } from "antd";
import { useRef } from "react";
import useComputeHeight from "../../hooks/useHeight";

const Table = (props: TableProps<any>) => {
  const refHeight = useRef(null);
  const height = useComputeHeight(refHeight);

  return (
    <TableAntd
      {...props}
      ref={refHeight}
      scroll={{
        y: height ? height - 100 : 500,
        x: 500,
      }}
    />
  );
};

export default Table;
