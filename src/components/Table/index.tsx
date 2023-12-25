import { Table as TableAnt, TableProps } from "antd";
import { useRef } from "react";
import useComputeHeight from "../../hooks/useHeight";

const Table = (props: TableProps<any>) => {
  const refHeight = useRef(null);
  const height = useComputeHeight(refHeight);

  return (
    <div ref={refHeight}>
      <TableAnt
        {...props}
        scroll={{
          y: height ? height - 135 : 500,
          x: 500,
        }}
      />
    </div>
  );
};

export default Table;
