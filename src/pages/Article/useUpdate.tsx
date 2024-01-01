import { Form, Input, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useCallback } from "react";
import { useAddArticle, useUpdateArticle } from "../../api/article";
import { useGetCategories } from "../../api/category";
import { toUpperCaseFirst } from "../../utils/string";
import { CategorySelector } from "../../components/CategorySelector";

export const useUpdate = (): [
  React.ReactElement,
  (refetch: () => void, article?: IArticle) => void
] => {
  const [api, element] = Modal.useModal();
  const [form] = useForm();

  const show = useCallback(
    async (refetch: () => void, article?: any) => {
      if (article) form.setFieldsValue({ ...article });

      api.confirm({
        closable: true,
        maskClosable: true,
        onOk: (close) => {
          form
            .validateFields()
            .then((values) => {
              if (article?.id) {
                useUpdateArticle(article?.id, values)
                  .then(() => {
                    refetch();
                    close();
                  })
                  .catch((err) => message.error(err?.message?.[0].message));
              } else {
                useAddArticle(values)
                  .then(() => {
                    refetch();
                    close();
                  })
                  .catch((err) => message.error(err?.message?.[0].message));
              }
            })
            .catch((e) => {
              console.log(e);
            });
        },
        afterClose: () => form.resetFields(),
        icon: (
          <div style={{ marginRight: 5 }}>
            <i className="fa-solid fa-edit"></i>
          </div>
        ),
        title: article?.id ? "Update Article" : "Add Article",
        content: (
          <Form form={form} style={{ marginRight: 10 }} layout="vertical">
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Categories"
              name="categoryId"
              rules={[{ required: true }]}
            >
              <CategorySelector />
            </Form.Item>
            <Form.Item
              label="ImageTopic"
              name="imageTopic"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="KeyWordSeo"
              name="keyWordSeo"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="DescriptionSeo"
              name="descriptionSeo"
              rules={[{ required: true }]}
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
        ),
      });
    },
    [api]
  );

  return [<div>{element}</div>, show];
};
