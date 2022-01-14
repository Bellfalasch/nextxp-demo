import {Context} from "../pages/[[...contentPath]]";


/**
 *  Object that configures the handling of a particular content type. All attributes are optional (see examples below), and missing values will fall back to default behavior:
 *          - 'query' (used in fetchContent.ts) Guillotine query for fetching content data, may also have a function that supplies guillotine variables. So, 'query' can EITHER be only a query string, OR also add a get-guillotine-variables function. In the latter case, 'query' can be an object with 'query' and 'variables' attributes, or an array where the query string is first and the get-variables function is second. Either way, the get-variables function takes two arguments: path (content path, mandatory) and context (next.js-supplied Context from getServerSideProps etc. Optional, and requires that fetchContent is called with the context, of course).
 *          - 'props' (used in fetchContent.ts) is a function for processing props after fetching them
 *          - 'view' (used in BasePage.tsx) is a react component: top-level content-type-specific rendering with the props first fetched from guillotine (and then optionally preprocessed with the function in 'props').
 */
export interface TypeDefinition {
    query?: SelectedQueryMaybeVariablesFunc,
    props?: DataProcessor,
    view?: React.FunctionComponent<any>
}

type SelectorName = "contentType" | "page" | "component" | "part" | "layout";

interface TypeDictionary {
    [type: string]: TypeDefinition;
}

//NB! Always return null or empty object from processor for next is unable to serialize undefined
export type DataProcessor = (data: any, context?: Context) => Promise<Record<string, any>>;

// TODO: also access as arguments: dataAsJson, pageAsJson, configAsJson from the first (meta) call here?
//  To allow content or component config values to affect the query?
//  Another option could be to let the component or page controller pass those values to nextjs by a header
export type VariablesGetter = (path: string, context?: Context) => VariablesGetterResult;

export type VariablesGetterResult = {
    path: string,
    [variables: string]: any
};

export type SelectedQueryMaybeVariablesFunc = string |
    { query: string, variables: VariablesGetter } |
    [string, VariablesGetter];

export const CATCH_ALL_NAME = "*";

export class TypesRegistry {

    private static contentTypes: TypeDictionary = {};
    private static pages: TypeDictionary = {};
    private static components: TypeDictionary = {};
    private static parts: TypeDictionary = {};
    private static layouts: TypeDictionary = {};

    private static getSelector(name: SelectorName): TypeDictionary {
        switch (name) {
        case 'contentType':
            return this.contentTypes;
        case 'page':
            return this.pages;
        case 'component':
            return this.components;
        case 'layout':
            return this.layouts;
        case 'part':
            return this.parts;
        }
    }

    private static getType(selectorName: SelectorName, typeName: string, useCatchAll: boolean = true): TypeDefinition | undefined {
        const selector = TypesRegistry.getSelector(selectorName);
        let type = selector[typeName];
        if (!type && useCatchAll) {
            type = selector[CATCH_ALL_NAME];
            if (type) {
                console.log(`TypeRegistry: using catch-all view for ${selectorName} '${typeName}': ${type.view?.name}`)
            }
        }
        return type;
    }

    private static addType(selectorName: SelectorName, name: string, obj: TypeDefinition): void {
        const selector = TypesRegistry.getSelector(selectorName);
        selector[name] = obj;
    }

    public static addContentType(name: string, obj: TypeDefinition): void {
        return TypesRegistry.addType('contentType', name, obj);
    }

    public static getContentType(name: string): TypeDefinition | undefined {
        return TypesRegistry.getType('contentType', name);
    }

    public static addPage(name: string, obj: TypeDefinition): void {
        return TypesRegistry.addType('page', name, obj);
    }

    public static getPage(name: string): TypeDefinition | undefined {
        return TypesRegistry.getType('page', name);
    }

    public static addPart(name: string, obj: TypeDefinition): void {
        return TypesRegistry.addType('part', name, obj);
    }

    public static getPart(name: string): TypeDefinition | undefined {
        return TypesRegistry.getType('part', name);
    }

    public static addLayout(name: string, obj: TypeDefinition): void {
        return TypesRegistry.addType('layout', name, obj);
    }

    public static getLayout(name: string): TypeDefinition | undefined {
        return TypesRegistry.getType('layout', name);
    }

    public static addComponent(name: string, obj: TypeDefinition): void {
        return TypesRegistry.addType('component', name, obj);
    }

    public static getComponent(name: string): TypeDefinition | undefined {
        return TypesRegistry.getType('component', name);
    }
}
