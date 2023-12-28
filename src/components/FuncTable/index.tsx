import "./style.less";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";

interface Props {
  icon?: string;
  style?: React.CSSProperties;
  title: "delete" | "edit";
  onClick?: () => void;
}

export const FuncTable = (props: Props) => {
  const [color, setColor] = useState<string>("#5d5a68");
  const [icon, setIcon] = useState<string>("");

  useEffect(() => {
    if (props.title)
      props.title === "edit" ? setColor("#7367f0") : setColor("#ff4d4f");

    props.title === "edit"
      ? setIcon("fa-solid fa-pen-to-square")
      : setIcon("fa-solid fa-trash-can");
  }, []);

  return (
    <Tooltip
      title={
        props.title?.toLowerCase().charAt(0).toUpperCase() +
        props.title.slice(1)
      }
    >
      <i
        style={{ ...props.style, color: color }}
        onClick={props.onClick}
        className={`fa-function ${icon}`}
      ></i>
    </Tooltip>
  );
};
