import React from "react";

interface Props {
    url?: string
    style?: React.CSSProperties
}

export const Avatar = (props: Props) => {
    return <img
        style={props.style}
        src={props.url}
        onError={({currentTarget}) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "./article-default.png";
        }}
        alt="article-topic"/>
}