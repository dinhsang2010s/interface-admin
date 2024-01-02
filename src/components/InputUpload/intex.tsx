import Upload from "antd/es/upload/Upload";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
interface Props {
  onChange?: (value: string) => void;
  value?: string;
}

export const InputUpload = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const uploadButton = (
    <button style={{ border: "1px dashed #000" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="flex">
      <Upload showUploadList={false}>
        <div className="flex">
          {uploadButton}
          {/* {props.value ? (
            uploadButton
          ) : (
            <img width={30} height={30} src={props.value} alt="image-topic" />
          )} */}
        </div>
      </Upload>
    </div>
  );
};
