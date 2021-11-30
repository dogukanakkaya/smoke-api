import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ICollection } from '../../context/collection/types'
import useCollection from '../../context/collection/useCollection'

const Request = () => {
    const [collection, setCollection] = useState<ICollection>({} as ICollection)
    const { _id } = useParams()
    const { loading, find } = useCollection()

    useEffect(() => {
        (async () => {
            if (_id) {
                const coll = await find(_id)
                setCollection(coll)
            }
        })()
    }, [_id])

    const createRequest = () => {

    }

    return (
        <div className="col-span-9">
            <div className="bg-white">
                <div className="flex justify-between items-center border-b pl-2 h-14">
                    <span onClick={createRequest} className="w-8 h-8 flex items-center justify-center cursor-pointer text-xl transition rounded hover:bg-gray-100"><i className="bi bi-plus"></i></span>
                </div>
            </div>
            <div>
                {
                    !loading ? (
                        <div>
                            <ul>
                                <li>{collection.title}</li>
                            </ul>
                        </div>
                    ) : <>Loading...</>
                }

            </div>
        </div>
    )
}

export default Request