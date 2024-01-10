import React from "react";
import {Image} from "antd";

interface Props {
    url?: string
    style?: React.CSSProperties
}

export const Avatar = (props: Props) => {
    return <Image
        className="w-full"
        style={props.style}
        src={props.url}
        onError={({currentTarget}) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "./article-default.png";
        }}
    />
}