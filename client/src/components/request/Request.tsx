import { useEffect } from 'react'
import { useParams } from 'react-router'
import useCollection from '../../context/collection/useCollection'

const Request = () => {
    const { _id } = useParams()
    const { find } = useCollection()

    useEffect(() => {
        (async () => {
            if (_id) {
                const collection = await find(_id)

            }
        })()
    }, [_id])

    return (
        <div className="col-span-9">
            <div className="bg-white">
                <div className="flex justify-between items-center border-b pl-2 h-14">
                    <span className="w-8 h-8 flex items-center justify-center cursor-pointer text-xl transition rounded hover:bg-gray-100"><i className="bi bi-plus"></i></span>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Request