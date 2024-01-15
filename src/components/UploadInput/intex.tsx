import "./style.less"
import {InboxOutlined, LoadingOutlined} from '@ant-design/icons';
import {UploadProps} from "antd";
import {useEffect, useRef, useState} from "react";
import {Avatar} from "../Avatar";
import Dragger from "antd/lib/upload/Dragger";
import {UPLOAD_IMAGE_TOPIC, URI_API_WP_CONTENTS} from "../../api/const.url.ts";
import {useDeleteImageTopic} from "../../api/upload.ts";

interface Props {
    onChange?: (value: string) => void;
    value?: string;
}

export const UploadInput = (props: Props) => {
    const [url, setUrl] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);
    const fileRef = useRef<string>("")

    useEffect(() => {
        if (props.value) setUrl(props.value)
    }, [props.value]);

    const propsUpload: UploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        action: UPLOAD_IMAGE_TOPIC,
        accept: "image/*",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token") ?? ""
        },
        onChange(info) {
            const {status, response} = info?.file;
            if (status !== 'uploading') setLoading(true);

            if (status === 'done') {
                if (fileRef.current) {
                    const fileName: string = fileRef.current?.split('/').pop() ?? ""
                    if (fileName)
                        useDeleteImageTopic(fileName).then().catch()
                }

                const urlImg = `${URI_API_WP_CONTENTS}/${response?.fileName}`
                if (props.onChange) props.onChange(urlImg)

                fileRef.current = urlImg;

                setUrl(urlImg)
                setLoading(false)
            } else if (status === 'error') {
                setLoading(false)
            }
        },
    };

    return (
        <div className="upload-input-item flex w-full" style={{height: 170}}>
            {
                url ? <div className="upload-file">
                    <Avatar style={{height: "100%", borderRadius: 6}} url={url}/>
                </div> : ""
            }
            <div style={{width: url ? "40%" : "100%"}}>
                <Dragger style={{padding: 5}} {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        {loading ? <LoadingOutlined/> : <InboxOutlined/>}
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
            </div>
        </div>

    )
};
