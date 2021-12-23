import React from "react";

import {PORTAL_COMPONENT_ATTRIBUTE, XP_COMPONENT_TYPE} from "../enonic-connection-config";
import {PageComponent} from "../../cms/queries/_getMetaData";
import {TypesRegistry} from '../TypesRegistry';


export type BaseComponentProps = {
    component: PageComponent,

    content?: any;                  // Content is passed down for optional consumption in componentviews.
    // TODO: pass more than content? Meta? Headers?
    // TODO: Use a react contextprovider instead of "manually" passing everything down
}

const BaseComponent = ({component, content}: BaseComponentProps) => {
    const {type} = component;
    const divAttrs: { [key: string]: string } = {
        [PORTAL_COMPONENT_ATTRIBUTE]: type
    };

    // @ts-ignore
    const ComponentView: React = TypesRegistry.getComponent(type)?.view || (() => {
        console.error(`Missing view for component type '${type}'`);
        return <></>;
    });

    const cmpAttrs: { [key: string]: any } = {
        component: component[type],
        content,
    };

    if (component.type === XP_COMPONENT_TYPE.LAYOUT) {
        // add regions to layout because they are not present in component[component.type] above
        cmpAttrs.regions = component.regions;
    }

    return (
        <div {...divAttrs}>
            <ComponentView {...cmpAttrs}/>
        </div>
    )
}
export default BaseComponent;
