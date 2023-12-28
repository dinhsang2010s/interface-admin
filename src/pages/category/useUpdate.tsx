import { Button, Form, Input, Modal, Select, message } from "antd";
import React, { useCallback } from "react";
import { AddCategory, UpdateCategory } from "../../api/category";
import { useForm } from "antd/es/form/Form";

export const useUpdateCategory = (): [
  React.ReactElement,
  (category?: ICategory, refetch?: () => void) => void
] => {
  const [api, element] = Modal.useModal();
  const [form] = useForm();

  const onOk = async (
    model: ICategory,
    currentCategoryId?: string,
    refetch?: () => void
  ) => {
    try {
      if (currentCategoryId)
        await UpdateCategory(currentCategoryId, { ...model });
      else await AddCategory({ ...model });
      if (refetch) refetch();
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      form.resetFields();
    }
  };

  const show = useCallback(
    (category?: any, refetch?: () => void) => {
      if (category?.id) form.setFieldsValue({ ...category });

      api.info({
        closable: true,
        maskClosable: true,
        okText: false,
        footer: false,
        afterClose: () => form.resetFields(),
        icon: (
          <div style={{ marginRight: 5 }}>
            <i className="fa-solid fa-edit"></i>
          </div>
        ),
        title: category?.id ? "Update Category" : "Add Category",
        content: (
          <Form
            onFinish={(values) => onOk(values, category?.id, refetch)}
            form={form}
            layout="vertical"
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Select
                defaultValue={category?.status ?? 1}
                options={[
                  { label: "Active", value: 1 },
                  { label: "Suspend", value: 0 },
                ]}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: 0,
              }}
            >
              <Button type="primary" htmlType="submit">
                OK
              </Button>
            </Form.Item>
          </Form>
        ),
      });
    },
    [api]
  );

  return [<div>{element}</div>, show];
};
