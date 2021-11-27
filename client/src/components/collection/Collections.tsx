import Card from './Card'
import { ICollection } from '../../context/collection/types'
import useCollection from '../../context/collection/useCollection'

const Collections = () => {
    const { loading, collections } = useCollection()

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