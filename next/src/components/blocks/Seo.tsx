import React, {FunctionComponent} from "react"
import Head from 'next/head';

type Meta = {
    name: string,
    content: string
};

type SeoProps = {
    description?: string,
    lang?: string,
    meta?: Meta | Meta[],
    title: string,
    author?: string,
    siteTitle?: string,
    keywords?: string[],
    viewport?: JSX.Element
};

const Seo: FunctionComponent<SeoProps> = ({description, lang, meta, author, title, siteTitle, keywords, viewport}: SeoProps) => (

    <Head>
        <title>{
            siteTitle && title
                ? `${title}  |  ${siteTitle}`
                : title || siteTitle || ""
        }</title>

                        <meta name="language" content={lang || 'en'} />
        {description ?  <meta name="description" content={description}/> : null}
        {title ?        <meta name="og:title" content={title}/> : null}
        {description ?  <meta name="og:description" content={description}/> : null}
                        <meta name="og:type" content="website"/>
                        <meta name="twitter:card" content="summary"/>
        {author ?       <meta name="twitter:creator" content={author}/>  : null}
        {author ?       <meta name="author" content={author}/>  : null}
        {title ?        <meta name="twitter:title" content={title}/>  : null}
        {description ?  <meta name="twitter:description" content={description}/>  : null}
        {keywords ?     <meta name="keywords" content={
                                []
                                    // @ts-ignore
                                    .concat(keywords)
                                    .join(", ")
                         } /> : null}
        {viewport ||    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>}

        { []
            // @ts-ignore
            .concat(meta || [])
            .map(
                (item:Meta, idx) => <meta key={idx} name={item.name} content={item.content} /> )
        }
    </Head>
);

export default Seo
