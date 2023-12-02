import "./style.less";
import { Spin } from "antd";

interface Props {
  loading?: boolean;
  children?: React.ReactNode;
}

const LoadingPage = (props: Props) => {
  return (
    <div className="loading-page flex-center">
      <Spin size="default" spinning={props.loading ?? true} delay={500}></Spin>
    </div>
  );
};

export default LoadingPage;
