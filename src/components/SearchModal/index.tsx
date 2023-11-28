import { Button, Modal } from "antd";
import { useState } from "react";
import "./style.less";

interface Props {
  title?: string;
}

const SearchModal = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="search-modal">
      <Button
        onClick={showModal}
        icon={<i className="fa fa-magnifying-glass"></i>}
      >
        {props.title || "Search..."}
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default SearchModal;
