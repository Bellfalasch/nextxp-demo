import React from "react"

import {IS_DEV_MODE} from "../../enonicAdapter/enonic-connection-config";

import {PageData} from "../../enonicAdapter/guillotine/fetchContent";
import DataDump from "../../enonicAdapter/views/DataDump";
import Empty from "../../enonicAdapter/views/Empty";

type ContentProps = {
    displayName: string,
}

type Props = {
    content: ContentProps,
    page?: PageData
}
const DefaultViewDev = ({ content, page }: Props) => {
    return (
        <div style={{padding: "10px"}}>
            <h2>{content.displayName}</h2>
            <DataDump label="content" data={content} />
            <br />
            <p style={{fontSize: ".7em", color: "#bbb"}}>_DefaultView.tsx</p>
        </div>
    )
}

const DefaultView = IS_DEV_MODE
    ? DefaultViewDev
    : Empty;

export default DefaultView;
