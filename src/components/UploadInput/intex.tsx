import "./style.less"
import {PlusOutlined, LoadingOutlined} from '@ant-design/icons';
import {message, Upload, UploadProps} from "antd";
import {useEffect, useState} from "react";
import Avatar from "../Avatar";

interface Props {
    onChange?: (value: string) => void;
    value?: string;
}

const URL_UPLOAD: string = `${import.meta.env.VITE_BASE_URL_DB}wp-contents/upload`
const URL_GET_FILE: string = `${import.meta.env.VITE_BASE_URL_DB}wp-contents/`
export const UploadInput = (props: Props) => {
    const [url, setUrl] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (props.value) setUrl(props.value)
    }, []);

    const propsUpload: UploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        action: URL_UPLOAD,
        accept: "image/*",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token") ?? ""
        },
        onChange(info) {
            const {status, name, response} = info?.file;
            if (status !== 'uploading') setLoading(true);

            if (status === 'done') {
                const urlImg = `${URL_GET_FILE}${response?.fileName || ""}`
                if (props.onChange) props.onChange(urlImg)
                setUrl(urlImg)
                setLoading(false)
                message.success(`${name} file uploaded successfully.`);
            } else if (status === 'error') {
                setLoading(false)
                message.error(`${name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const uploadButton = (
        <Upload {...propsUpload}>
            <button style={{border: 0, background: 'none'}} type="button">
                {loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div style={{marginTop: 8}}>Upload</div>
            </button>
        </Upload
        >
    );
    return (
        <div className="upload-input-component w-full"
             style={{border: "1px dashed  #d9d9d9", borderRadius: 6, background: "#fafafa", padding: 10}}>
            {
                url ? <div className="flex w-full">
                    <Avatar style={{height: 100, borderRadius: 6}} url={url}/>
                    <div className="flex-center w-full">
                        {uploadButton}
                    </div>
                </div> : <div style={{height: 100}} className="w-full flex-center">{uploadButton}</div>
            }
        </div>
    )
};
