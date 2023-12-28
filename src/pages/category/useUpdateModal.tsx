import { Form, Input, Modal, Select, Spin } from "antd";
import { useState } from "react";
import { useModalForm } from "sunflower-antd";

export const useUpdateCategoryModal = (): [
  React.ReactElement,
  (category?: ICategory, refetch?: () => void) => void
] => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState("Add");
  const { modalProps, formProps, show, formLoading } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    autoResetForm: true,
    async submit(values) {
      await new Promise((r) => setTimeout(r, 1000));
      console.log("afterSubmit", values);
    },
    form,
  });

  const element = (
    <Modal
      {...modalProps}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <i
            style={{ marginRight: 5, fontSize: 22 }}
            className="fa-solid fa-edit"
          ></i>
          <span>{`${title} Category`}</span>
        </div>
      }
      okText="OK"
    >
      <Spin spinning={formLoading}>
        <Form layout="vertical" {...formProps}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              defaultValue={1}
              options={[
                { label: "Active", value: 1 },
                { label: "Suspend", value: 0 },
              ]}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );

  const showModel = (category?: ICategory, refetch?: () => void) => {
    show();
    if (category?.id) {
      form.setFieldsValue({ name: category.name, status: category.status });
      setTitle("Update");
    }
  };

  return [element, showModel];
};
