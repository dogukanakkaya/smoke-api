import { ICollection } from '../../context/collection/type'
import useCollection from '../../context/collection/useCollection'
import Form from '../form/Form'
import Collection from './Collection'

const Collections = () => {
    const { collections } = useCollection()

    return (
        <div className="bg-white shadow">
            <div className="flex items-center relative">
                <i className="bi bi-search absolute left-2"></i> <Form.Input className="pl-8" />
            </div>
            <ul className="flex flex-col">
                {
                    collections.map((collection: ICollection) => <Collection key={collection._id} collection={collection} />)
                }
            </ul>
        </div>
    )
}

export default Collections