import { useState } from 'react'
import Card from './Card'
import { Collection } from '../../types/collection'

const Collections = () => {
    const [collections, setCollections] = useState<Collection[]>([
        {
            id: 1,
            title: "Flight API V5",
            createdAt: "27 Dec, 2021"
        },
        {
            id: 2,
            title: "Flight API V5",
            createdAt: "27 Dec, 2021"
        },
        {
            id: 3,
            title: "Flight API V5",
            createdAt: "27 Dec, 2021"
        },
        {
            id: 4,
            title: "Flight API V5",
            createdAt: "27 Dec, 2021"
        },
        {
            id: 5,
            title: "Flight API V5",
            createdAt: "27 Dec, 2021"
        }
    ])

    return (
        <div className="container">
            <div className="grid grid-cols-6 gap-5">
                {
                    collections.map((collection: Collection) => <Card collection={collection} key={collection.id} />)
                }
            </div>
        </div>
    )
}

export default Collections