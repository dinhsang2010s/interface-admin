import React, { useEffect } from "react";
import { Button, Form, Input, Modal, ModalProps, Select, message } from "antd";
import { AddPost, UpdatePost } from "../../api/post";

interface Props extends ModalProps {
  post?: IPost;
  refetch?: () => void;
  showModal?: (post?: IPost, refetch?: () => void) => void;
}
const UpdatePostModal = (props: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.post)
      form.setFieldsValue({
        title: props.post.title,
        description: props.post.description,
        content: props.post.content,
        categoryId: props.post.categoryId,
        imageTopic: props.post.imageTopic,
        keyWordSeo: props.post.keyWordSeo,
        descriptionSeo: props.post.descriptionSeo,
        status: props.post.status,
      });
  }, []);

  const onFinish = async (values: IPost) => {
    try {
      if (props.post?.id) await UpdatePost(props.post?.id, { ...values });
      else await AddPost({ ...values });

      message.success(
        `Your ${
          props.post?.id ? "update" : "add"
        }  have been successfully saved!`
      );

      if (props.refetch) props.refetch();
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      form.resetFields();
    }
  };

  return (
    <Modal
      closable={true}
      maskClosable={true}
      {...props}
      title={props.post?.id ? "Update Post" : "Add Post"}
    >
      <Form
        onFinish={onFinish}
        form={form}
        style={{ marginRight: 10 }}
        layout="vertical"
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content" rules={[{ required: true }]}>
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
            defaultValue={1}
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
    </Modal>
  );
};

export default UpdatePostModal;
