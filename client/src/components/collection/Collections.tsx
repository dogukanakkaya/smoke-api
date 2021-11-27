import { useState, useEffect } from 'react'
import Card from './Card'
import { ICollection } from '../../types/collection'
import { request } from '../../utils/request'
import { Response } from '../../types/api'

const Collections = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [collections, setCollections] = useState<ICollection[]>([])

    useEffect(() => {
        (async () => {
            const response: Response<{ collections: ICollection[] }> = await request.get(`/collection`)
            setCollections(response.data.collections);

            setLoading(false)
        })()
    }, [])

    return (
        <div className="container">
            <div className="grid grid-cols-6 gap-5">
                {
                    loading ? <>Loading...</> :
                        collections.map((collection: ICollection) => <Card collection={collection} key={collection._id} />)
                }
            </div>
        </div>
    )
}

export default Collections