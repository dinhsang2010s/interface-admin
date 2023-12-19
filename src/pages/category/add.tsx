import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useCallback } from "react";

export const useUpdateCategory = (): [
  React.ReactElement,
  (category?: any) => void
] => {
  const [api, element] = Modal.useModal();
  const [form] = useForm();

  const onUpdate = (values: any) => {
    console.log("Success:", values);
  };

  const onOk = () => {
    console.log("asdas");
  };
  const show = useCallback(
    (category?: ICategory) => {
      if (category?.id) form.setFieldsValue({ name: category.name });

      api.info({
        closable: true,
        maskClosable: true,
        okCancel: true,
        icon: <i className="fa-solid fa-edit"></i>,
        title: "Update Category",
        content: (
          <Form
            onFinish={onUpdate}
            form={form}
            style={{ marginRight: 10 }}
            layout="vertical"
          >
            <Form.Item label="Name" name="name" required>
              <Input />
            </Form.Item>
          </Form>
        ),
      });
    },
    [api]
  );

  return [<div>{element}</div>, show];
};
