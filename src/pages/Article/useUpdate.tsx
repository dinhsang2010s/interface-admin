import {Form, Input, Modal, Select, message} from "antd";
import {useForm} from "antd/es/form/Form";
import React, {useCallback} from "react";
import {useAddArticle, useUpdateArticle} from "../../api/article";
import {CategorySelector} from "../../components/CategorySelector";
import {UploadInput} from "../../components/UploadInput/intex";
import {del} from "../../hooks/useRequest.ts";
import {messageContent} from "../../utils/string.ts";

export const useUpdate = (): [
    React.ReactElement,
    (refresh: () => void, article?: IArticle) => void
] => {
    const [api, element] = Modal.useModal();
    const [form] = useForm();

    const show = useCallback(
        // eslint-disable-next-line
        async (refresh: () => void, article?: any) => {
            if (article) form.setFieldsValue({...article});

            api.confirm({
                closable: true,
                maskClosable: true,
                onOk: (close) => {
                    form
                        .validateFields()
                        .then((values) => {
                            if (article?.id) {
                                useUpdateArticle(article?.id, values)
                                    .then((res: IArticle) => {
                                        message.success(` Update article [ ${messageContent(res.title, 50)} ] successfully.`)
                                        refresh();
                                        form.resetFields()
                                        close();
                                    })
                                    .catch((err) => message.error(err?.message));
                            } else {
                                useAddArticle(values)
                                    .then((res: IArticle) => {
                                        message.success(` Add article [ ${messageContent(res.title, 50)} ] successfully.`)
                                        refresh();
                                        form.resetFields()
                                        close();
                                    })
                                    .catch((err) => message.error(err?.message));
                            }
                        })
                        .catch();
                },
                afterClose: () => {
                    const {imageTopic} = form.getFieldsValue()
                    if (imageTopic) {
                        // const fileName: string = imageTopic?.replace(/^.*[\\/]/, '')
                        const fileName: string = imageTopic?.split('/').pop()
                        del(`wp-contents/${fileName}`).then(() => {
                            form.resetFields()
                        }).catch((err) => message.error(err?.message))
                    }
                },
                icon: (
                    <div style={{marginRight: 5}}>
                        <i className="fa-solid fa-edit"></i>
                    </div>
                ),
                title: article?.id ? "Update Article" : "Add Article",
                content: (
                    <Form form={form} style={{marginRight: 10}} layout="vertical">
                        <Form.Item label="Title" name="title" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Content"
                            name="content"
                            rules={[{required: true}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Categories"
                            name="categoryId"
                            rules={[{required: true}]}
                        >
                            <CategorySelector/>
                        </Form.Item>
                        <Form.Item
                            label="ImageTopic"
                            name="imageTopic"
                            rules={[{required: true}]}
                        >
                            <UploadInput/>
                        </Form.Item>
                        <Form.Item
                            label="KeyWordSeo"
                            name="keyWordSeo"
                            rules={[{required: true}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="DescriptionSeo"
                            name="descriptionSeo"
                            rules={[{required: true}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Select
                                defaultValue={1}
                                options={[
                                    {label: "Active", value: 1},
                                    {label: "Suspend", value: 0},
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
