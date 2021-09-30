import React from "react"
import {Person} from "../../shared/data/queries/getPerson";

import styles from "../../styles/Home.module.css";

import Link from 'next/link'

import {getFirstPhotoData} from "../../shared/images/images";
import {getPageUrlFromXpPath} from "../../enonic-connection-config";


const PersonPage = (person: Person) => {
    // console.log("\n\nPerson props:", person);

    const personMeta = person.data || {};
    const personFirstPhoto = getFirstPhotoData(personMeta.photos);

    return (
        <>
            <div>
                <div style={{
                    display: 'flex',
                    alignItems: 'baseline'
                }}>
                    <h2>{person.displayName}</h2>
                </div>
                <div style={{
                    display: `flex`
                }}>
                    {
                        // @ts-ignore
                        personFirstPhoto && personFirstPhoto.imageUrl &&
                        <>
                            <img src={personFirstPhoto.imageUrl}
                                 alt={person.displayName}
                                 className={styles.mainPhoto}/>
                        </>
                    }
                    <p style={{
                        margin: `0 20px`
                    }}><i>{personMeta.bio}</i></p>
                </div>
            </div>
            <p>
                <a href={getPageUrlFromXpPath(person.parent._path)}>Back to Persons</a>
            </p>
        </>
    )
}

export default PersonPage
