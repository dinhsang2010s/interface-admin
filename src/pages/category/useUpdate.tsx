import { Form, Input, Modal, Select, message } from "antd";
import React, { useCallback } from "react";
import { useAddCategory, useUpdateCategory } from "../../api/category";
import { useForm } from "antd/es/form/Form";

export const useUpdate = (): [
  React.ReactElement,
  (refetch: () => void, category?: ICategory) => void
] => {
  const [api, element] = Modal.useModal();
  const [form] = useForm();

  const show = useCallback(
    (refetch: () => void, category?: ICategory) => {
      if (category?.id) form.setFieldsValue({ ...category });

      api.confirm({
        closable: true,
        maskClosable: true,
        okText: false,
        onOk: (close) => {
          form.validateFields().then((values) => {
            if (category?.id) {
              useUpdateCategory(category?.id, values)
                .then(() => {
                  refetch();
                  close();
                })
                .catch((err) => message.error(err?.message));
            } else {
              useAddCategory(values)
                .then(() => {
                  refetch();
                  close();
                })
                .catch((err) => message.error(err?.message));
            }
          });
        },
        afterClose: () => form.resetFields(),
        icon: (
          <div style={{ marginRight: 5 }}>
            <i className="fa-solid fa-edit"></i>
          </div>
        ),
        title: category?.id ? "Update Category" : "Add Category",
        content: (
          <Form form={form} layout="vertical">
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
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
        ),
      });
    },
    [api]
  );

  return [<div>{element}</div>, show];
};
