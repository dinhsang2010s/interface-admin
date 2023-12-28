import { Button, Form, Input, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useCallback } from "react";
import { AddPost, UpdatePost } from "../../api/post";

export const useUpdatePost = (): [
  React.ReactElement,
  (post?: IPost, refetch?: () => void) => void
] => {
  const [api, element] = Modal.useModal();
  const [form] = useForm();

  const onOk = async (post: IPost, refetch?: () => void) => {
    try {
      await form.submit();

      const model = form.getFieldsValue();

      if (post?.id) await UpdatePost(post?.id, { ...model });
      else await AddPost({ ...model });

      message.success(
        `Your ${post?.id ? "update" : "add"}  have been successfully saved!`
      );

      if (refetch) refetch();
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      form.resetFields();
    }
  };

  const show = useCallback(
    (post?: any, refetch?: () => void) => {
      if (post?.id) form.setFieldsValue({ ...post });

      api.info({
        closable: true,
        maskClosable: true,
        onOk: () => onOk(post, refetch),
        icon: (
          <div style={{ marginRight: 5 }}>
            <i className="fa-solid fa-edit"></i>
          </div>
        ),
        title: post?.id ? "Update Post" : "Add Post",
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
              label="CategoryID"
              name="categoryId"
              rules={[{ required: true }]}
            >
              <Input />
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
                defaultValue={post?.status ?? 1}
                options={[
                  { label: "Active", value: 1 },
                  { label: "Suspend", value: 0 },
                ]}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
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
