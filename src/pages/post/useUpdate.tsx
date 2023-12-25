import { Form, Input, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useCallback } from "react";
import { AddCategory, UpdateCategory } from "../../api/category";

export const useUpdateCategory = (): [
  React.ReactElement,
  (category?: ICategory, refetch?: () => void) => void
] => {
  const [api, element] = Modal.useModal();
  const [form] = useForm();

  const onOk = async (category: ICategory, refetch?: () => void) => {
    try {
      const model = form.getFieldsValue();

      if (category?.id) await UpdateCategory(category?.id, { ...model });
      else await AddCategory({ ...model });

      message.success(
        `Your ${category?.id ? "update" : "add"}  have been successfully saved!`
      );

      if (refetch) refetch();
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      form.resetFields();
    }
  };

  const show = useCallback(
    (category?: any, refetch?: () => void) => {
      if (category?.id) form.setFieldsValue({ name: category.name });

      api.info({
        closable: true,
        maskClosable: true,
        onOk: () => onOk(category, refetch),
        icon: (
          <div style={{ marginRight: 5 }}>
            <i className="fa-solid fa-edit"></i>
          </div>
        ),
        title: category?.id ? "Update Category" : "Add Category",
        content: (
          <Form form={form} style={{ marginRight: 10 }} layout="vertical">
            <Form.Item label="Name" name="name" required>
              <Input />
            </Form.Item>
            {category?.id ? (
              <Form.Item label="Status" name="status">
                <Select
                  defaultValue={category?.status}
                  options={[
                    { label: "Active", value: 1 },
                    { label: "Suspend", value: 0 },
                  ]}
                />
              </Form.Item>
            ) : (
              ""
            )}
          </Form>
        ),
      });
    },
    [api]
  );

  return [<div>{element}</div>, show];
};
